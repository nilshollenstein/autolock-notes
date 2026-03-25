import { Stack } from "expo-router";
import { AuthProvider } from "./context/AuthContext";
import { NoteProvider } from "./context/noteContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <NoteProvider>
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
      </NoteProvider>
    </AuthProvider>
  );
}
