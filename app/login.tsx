import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    KeyboardAvoidingView,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";
import { useAuth } from "./context/AuthContext";

export default function login() {
  const [pin, setPin] = useState<string>();
  const authContext = useAuth();
  const router = useRouter();

  async function login() {
    if (!pin) {
      Alert.alert("Please enter a Pin");
      return;
    }
    let isLoggedIn = await authContext.unlockWithPin(pin);
    if (isLoggedIn) {
      router.replace("/");
      return;
    }
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Enter Pin</Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Pin</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={pin}
            placeholderTextColor="#888"
            maxLength={6}
            secureTextEntry
            onChangeText={setPin}
          />
        </View>

        <Pressable style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Login</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    paddingHorizontal: 24,
    paddingTop: 90,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111",
    marginBottom: 8,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#dcdcdc",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 18,
    color: "#111",
  },
  button: {
    padding: 15,
    backgroundColor: "#ad0000",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
