import { Stack } from "expo-router";
import { NoteProvider } from "./context/noteContext";

export default function RootLayout() {
  return (
    <NoteProvider>
      <Stack></Stack>
    </NoteProvider>
  );
}
