import { Ionicons } from "@expo/vector-icons";
import { Redirect, useRouter } from "expo-router";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { DisplayNote } from "../src/components/listNoteElement";
import { useAuth } from "../src/context/AuthContext";
import { useNote } from "../src/context/noteContext";

export default function Index() {
  const noteList = useNote().noteList;
  const router = useRouter();
  const authContext = useAuth();

  if (authContext.isLoading) {
    return (
      <View style={style.view}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!authContext.hasPin) return <Redirect href="/setup" />;
  if (authContext.isLocked) return <Redirect href="/login" />;

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
        <Ionicons name="create-outline" size={30} color={"#fff"} />
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
