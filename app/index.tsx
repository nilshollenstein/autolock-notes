import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import { DisplayNote } from "./components/listNoteElement";
import { useNote } from "./context/noteContext";

export default function Index() {
  const noteList = useNote().noteList;
  const router = useRouter();
  function addNote() {
    router.push("/addNote");
  }

  return (
    <View style={style.view}>
      <FlatList
        data={noteList}
        renderItem={({ item }) => <DisplayNote note={item} />}
        keyExtractor={(item) => item.id}
      ></FlatList>
      <Pressable style={style.button} onPress={addNote}>
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
