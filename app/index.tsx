import { Ionicons } from "@expo/vector-icons";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { displayNote } from "./components/note";
import { useNote } from "./context/noteContext";

export default function Index() {
  let noteList = useNote().noteList;

  return (
    <View style={style.view}>
      <FlatList
        data={noteList}
        renderItem={({ item }) => displayNote(item)}
        keyExtractor={(item) => item.id}
      ></FlatList>
      <Pressable style={style.button}>
        <Ionicons name="create-outline" size={30} />
      </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
  view: {
    backgroundColor: "#ffffff",
    flex: 1,
  },
  button: {
    width: 60,
    height: 60,
    bottom: 20,
    right: 20,
    backgroundColor: "#ad0000",
    position: "absolute",
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
