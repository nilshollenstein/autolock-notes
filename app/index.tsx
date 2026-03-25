import { FlatList, View } from "react-native";
import { displayNote } from "./components/note";
import { useNote } from "./context/noteContext";

export default function Index() {
  let noteList = useNote().noteList;

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <FlatList
        data={noteList}
        renderItem={({ item }) => displayNote(item)}
        keyExtractor={(item) => item.id}
      ></FlatList>
    </View>
  );
}
