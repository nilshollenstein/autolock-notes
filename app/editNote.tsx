import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";
import NoteDetail from "./components/noteDetail";
import { useNote } from "./context/noteContext";

export default function EditNote() {
  const navigation = useNavigation();
  const router = useRouter();

  const { noteList, saveNote, removeNote } = useNote();
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

  useEffect(() => {
    navigation.setOptions({
      headerRight: () =>
        note ? (
          <Pressable onPress={handleRemove} style={{ paddingHorizontal: 12 }}>
            <Ionicons name="trash" color={"#fff"} size={25}></Ionicons>
          </Pressable>
        ) : null,
    });
  }, [navigation, note]);

  function handleRemove() {
    if (!note) return;

    Alert.alert("Notiz löschen", "Möchtest du diese Notiz wirklich löschen?", [
      { text: "Abbrechen", style: "cancel" },
      {
        text: "Löschen",
        style: "destructive",
        onPress: () => {
          removeNote(note.id);
          router.back();
        },
      },
    ]);
  }

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
