import { Accelerometer } from "expo-sensors";
import { createContext, ReactNode, useContext, useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";
import { useAuth } from "./AuthContext";

interface LockContextType {
  markActivity: () => void;
}

const MOVEMENT_THRESHOLD = 0.12;
const INACTIVITY_TIMEOUT_MS = 5 * 60 * 1000;
const UPDATE_INTERVAL_MS = 500;

const LockContext = createContext<LockContextType | undefined>(undefined);

export function LockProvider({ children }: { children: ReactNode }) {
  const { hasPin, isLocked, lockApp } = useAuth();

  const appState = useRef<AppStateStatus>(AppState.currentState);
  const blurTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastReadingRef = useRef<{ x: number; y: number; z: number } | null>(
    null,
  );
  const lastActivityAtRef = useRef<number>(Date.now());

  function markActivity() {
    if (!hasPin || isLocked) return;
    lastActivityAtRef.current = Date.now();
  }

  useEffect(() => {
    const changeSubscription = AppState.addEventListener(
      "change",
      (nextAppState) => {
        const previousAppState = appState.current;

        if (
          hasPin &&
          previousAppState === "active" &&
          (nextAppState === "inactive" || nextAppState === "background")
        ) {
          lockApp();
        }

        appState.current = nextAppState;
      },
    );

    const blurSubscription = AppState.addEventListener("blur", () => {
      if (!hasPin || isLocked) return;

      if (blurTimeout.current) {
        clearTimeout(blurTimeout.current);
      }

      blurTimeout.current = setTimeout(() => {
        lockApp();
      }, INACTIVITY_TIMEOUT_MS);
    });

    const focusSubscription = AppState.addEventListener("focus", () => {
      if (blurTimeout.current) {
        clearTimeout(blurTimeout.current);
        blurTimeout.current = null;
      }

      markActivity();
    });

    return () => {
      changeSubscription.remove();
      blurSubscription.remove();
      focusSubscription.remove();

      if (blurTimeout.current) {
        clearTimeout(blurTimeout.current);
        blurTimeout.current = null;
      }
    };
  }, [hasPin, isLocked]);

  useEffect(() => {
    if (!hasPin || isLocked) return;

    Accelerometer.setUpdateInterval(UPDATE_INTERVAL_MS);
    lastActivityAtRef.current = Date.now();
    lastReadingRef.current = null;

    const subscription = Accelerometer.addListener((data) => {
      const lastReading = lastReadingRef.current;

      if (lastReading) {
        const deltaX = Math.abs(data.x - lastReading.x);
        const deltaY = Math.abs(data.y - lastReading.y);
        const deltaZ = Math.abs(data.z - lastReading.z);

        const hasMovement =
          deltaX > MOVEMENT_THRESHOLD ||
          deltaY > MOVEMENT_THRESHOLD ||
          deltaZ > MOVEMENT_THRESHOLD;

        if (hasMovement) {
          markActivity();
        }
      }

      lastReadingRef.current = {
        x: data.x,
        y: data.y,
        z: data.z,
      };
    });

    const interval = setInterval(() => {
      const inactiveFor = Date.now() - lastActivityAtRef.current;

      if (inactiveFor > INACTIVITY_TIMEOUT_MS) {
        lockApp();
      }
    }, 1000);

    return () => {
      subscription.remove();
      clearInterval(interval);
    };
  }, [hasPin, isLocked]);

  return (
    <LockContext.Provider
      value={{
        markActivity,
      }}
    >
      {children}
    </LockContext.Provider>
  );
}

export function useLock() {
  const context = useContext(LockContext);

  if (!context) {
    throw new Error("useLock must be used inside LockProvider");
  }

  return context;
}
