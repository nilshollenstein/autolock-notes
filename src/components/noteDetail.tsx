import { StyleSheet, TextInput, View } from "react-native";

interface NoteDetailProps {
  title: string;
  text: string;
  onTitleChange: (value: string) => void;
  onTextChange: (value: string) => void;
}

export function NoteDetail({
  title,
  text,
  onTitleChange,
  onTextChange,
}: NoteDetailProps) {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={onTitleChange}
        style={styles.titleInput}
        placeholderTextColor="#888"
      />

      <TextInput
        placeholder="Start writing..."
        value={text}
        multiline
        textAlignVertical="top"
        onChangeText={onTextChange}
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
    marginBottom: 10,
    minHeight: 200,
  },
});
