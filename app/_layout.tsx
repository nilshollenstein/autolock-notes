import { Stack } from "expo-router";
import { View } from "react-native";
import { AuthProvider } from "./context/AuthContext";
import { LockProvider, useLock } from "./context/LockContext";
import { NoteProvider } from "./context/noteContext";

function AppShell() {
  const { markActivity } = useLock();

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
