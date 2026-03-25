import { Stack } from "expo-router";
import { NoteProvider } from "./context/noteContext";

export default function RootLayout() {
  return (
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
      </Stack>
    </NoteProvider>
  );
}
