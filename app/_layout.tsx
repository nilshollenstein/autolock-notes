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
            title: "Notitzen",
          }}
        />
      </Stack>
    </NoteProvider>
  );
}
