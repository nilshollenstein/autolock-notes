import * as Crypto from "expo-crypto";
import { useState } from "react";
import { Alert, StyleSheet, TextInput, View } from "react-native";
import Note from "../models/note";

interface NoteDetailProps {
  initialNote?: Note;
  onSave: (note: Note) => void;
}

export default function NoteDetail({ initialNote, onSave }: NoteDetailProps) {
  const [title, setTitle] = useState(initialNote?.title ?? "");
  const [text, setText] = useState(initialNote?.text ?? "");
  const [noteId] = useState(initialNote?.id ?? Crypto.randomUUID());

  function handleSave() {
    if (!title.trim()) {
      Alert.alert("Title has to be filled out");
      return;
    }

    const note: Note = {
      id: noteId,
      title: title.trim(),
      text: text.trim() || undefined,
    };

    onSave(note);
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
        onBlur={handleSave}
        style={styles.titleInput}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Start writing..."
        value={text}
        multiline
        textAlignVertical="top"
        onChangeText={setText}
        onBlur={handleSave}
        style={styles.textInput}
        placeholderTextColor="#888"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 18,
    paddingTop: 20,
    paddingBottom: 16,
  },
  titleInput: {
    fontSize: 30,
    fontWeight: "700",
    color: "#000",
    paddingVertical: 12,
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#e5e5e5",
  },
  textInput: {
    flex: 1,
    fontSize: 18,
    color: "#000",
    paddingTop: 12,
    paddingBottom: 12,
    minHeight: 200,
  },
});
