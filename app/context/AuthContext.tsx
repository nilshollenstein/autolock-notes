import * as SecureStore from "expo-secure-store";
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
    useState,
} from "react";

interface AuthContextType {
  hasPin: boolean;
  isLocked: boolean;
  isLoading: boolean;
  setPin: (pin: string) => Promise<void>;
  unlockWithPin: (pin: string) => Promise<boolean>;
  removePin: () => Promise<void>;
  lockApp: () => void;
}

const PIN_KEY = "pin";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [hasPin, setHasPin] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPin();
  }, []);

  async function loadPin() {
    try {
      const storedPin = await SecureStore.getItemAsync(PIN_KEY);

      if (storedPin !== null) {
        setHasPin(true);
        setIsLocked(true);
      } else {
        setHasPin(false);
        setIsLocked(false);
      }
    } catch (error) {
      console.error("Failed to load pin state", error);
      setHasPin(false);
      setIsLocked(false);
    } finally {
      setIsLoading(false);
    }
  }

  async function setPin(pin: string) {
    await SecureStore.setItemAsync(PIN_KEY, pin);
    setHasPin(true);
  }

  async function unlockWithPin(pin: string): Promise<boolean> {
    if (!hasPin) return false;

    const storedPin = await SecureStore.getItemAsync(PIN_KEY);

    if (storedPin === pin) {
      setIsLocked(false);
      return true;
    }

    return false;
  }

  function lockApp() {
    setIsLocked(true);
  }

  async function removePin() {
    await SecureStore.deleteItemAsync(PIN_KEY);
    setHasPin(false);
    setIsLocked(false);
  }

  return (
    <AuthContext.Provider
      value={{
        hasPin,
        isLocked,
        isLoading,
        setPin,
        unlockWithPin,
        removePin,
        lockApp,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }

  return context;
}
