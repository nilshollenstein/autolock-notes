import { useLocalSearchParams, useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import NoteDetail from "./components/noteDetail";
import { useNote } from "./context/noteContext";

export default function EditNote() {
  const navigation = useNavigation();

  const { noteList, saveNote } = useNote();
  const { id } = useLocalSearchParams<{ id: string }>();

  const note = noteList.find((n) => n.id === id);

  const [title, setTitle] = useState(note?.title ?? "");
  const [text, setText] = useState(note?.text ?? "");

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      if (!note) return;
      if (!title.trim()) return;

      saveNote({
        id: note.id,
        title: title.trim(),
        text: text.trim() || undefined,
      });
    });

    return unsubscribe;
  }, [navigation, note, title, text, saveNote]);

  return (
    <View style={{ flex: 1 }}>
      <NoteDetail
        title={title}
        text={text}
        onTitleChange={setTitle}
        onTextChange={setText}
      />
    </View>
  );
}
