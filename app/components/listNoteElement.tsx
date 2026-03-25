import { StyleSheet, Text, View } from "react-native";

import Note from "../models/note";

interface DisplayNoteProps {
  note: Note;
}

export function DisplayNote({ note }: DisplayNoteProps) {
  return (
    <View style={styles.item}>
      <Text style={styles.title} numberOfLines={1}>
        {note.title}
      </Text>
      <Text style={styles.preview} numberOfLines={1}>
        {note.text}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#cfcfcf",
    backgroundColor: "transparent",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#222222",
    marginBottom: 2,
  },
  preview: {
    fontSize: 16,
    color: "#666666",
  },
});
