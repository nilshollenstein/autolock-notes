import { View } from "react-native";
import NoteDetail from "./components/noteDetail";
import { useNote } from "./context/noteContext";

export default function AddNote() {
  const { noteList, saveNote } = useNote();

  return (
    <View style={{ flex: 1 }}>
      <NoteDetail onSave={saveNote} />
    </View>
  );
}
