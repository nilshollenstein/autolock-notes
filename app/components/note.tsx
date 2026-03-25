import { StyleSheet, Text, View } from "react-native";
import Note from "../models/note";

export function displayNote(note: Note) {
  return (
    <View style={style.view}>
      <Text>{note.title}</Text>
      <Text>{note.text}</Text>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    margin: 15,
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    elevation: 10,
  },
});
