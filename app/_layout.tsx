import { Ionicons } from "@expo/vector-icons";
import { Stack } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { AuthProvider, useAuth } from "../src/context/AuthContext";
import { LockProvider, useLock } from "../src/context/LockContext";
import { NoteProvider } from "../src/context/noteContext";

function AppShell() {
  const { markActivity } = useLock();
  const { lockApp } = useAuth();
  return (
    <View
      style={{ flex: 1 }}
      onTouchStart={markActivity}
      onTouchMove={markActivity}
    >
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#ad0000",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Notes",
            headerRight: () => (
              <Pressable onPress={lockApp} style={styles.logoutButton}>
                <Ionicons
                  name="lock-closed-outline"
                  color={"#fff"}
                  size={30}
                ></Ionicons>
              </Pressable>
            ),
          }}
        />
        <Stack.Screen
          name="addNote"
          options={{
            title: "Add Note",
          }}
        />
        <Stack.Screen
          name="editNote"
          options={{
            title: "Edit Note",
          }}
        />
        <Stack.Screen
          name="setup"
          options={{
            title: "Setup Pin",
          }}
        />
        <Stack.Screen
          name="login"
          options={{
            title: "Login",
          }}
        />
      </Stack>
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <LockProvider>
        <NoteProvider>
          <AppShell />
        </NoteProvider>
      </LockProvider>
    </AuthProvider>
  );
}
const styles = StyleSheet.create({
  logoutButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
});
