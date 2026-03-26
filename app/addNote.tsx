import * as Crypto from "expo-crypto";
import { useNavigation } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { NoteDetail } from "../src/components/noteDetail";
import { useNote } from "../src/context/noteContext";

export default function AddNote() {
  const navigation = useNavigation();
  const { saveNote } = useNote();

  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [noteId] = useState(Crypto.randomUUID());

  useEffect(() => {
    const unsubscribe = navigation.addListener("beforeRemove", () => {
      if (!title.trim()) return;

      saveNote({
        id: noteId,
        title: title.trim(),
        text: text.trim() || undefined,
      });
    });

    return unsubscribe;
  }, [navigation, title, text, noteId, saveNote]);

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
