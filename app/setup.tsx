import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useAuth } from "./context/AuthContext";

export default function Setup() {
  const authContext = useAuth();
  const router = useRouter();
  const [pin, setPin] = useState<string>();
  const [pinConfirmation, setPinConfirmation] = useState<string>();

  function handlePinSave() {
    if (!pin || !pinConfirmation) {
      Alert.alert("Both fields have to be filled out");
      return;
    }

    if (pin.length < 4) {
      Alert.alert("PIN has to be at least 4 Numbers long");
      return;
    }

    if (pin !== pinConfirmation) {
      Alert.alert("PINs do not match");
      return;
    }

    authContext.setPin(pin);
    router.replace("/login");
  }

  return (
    <KeyboardAvoidingView style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.title}>Create Pin</Text>
        <Text style={styles.subtitle}>
          Set a Pin for the App, it has to be at least 4 Numbers long
        </Text>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>PIN</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            placeholderTextColor="#888"
            maxLength={6}
            secureTextEntry
            onChangeText={setPin}
            value={pin}
          />
        </View>

        <View style={styles.inputGroup}>
          <Text style={styles.label}>Confirm Pin</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={pinConfirmation}
            placeholderTextColor="#888"
            maxLength={6}
            secureTextEntry
            onChangeText={setPinConfirmation}
          />
        </View>

        <TouchableOpacity style={styles.button} onPress={handlePinSave}>
          <Text style={styles.buttonText}>Save</Text>
        </TouchableOpacity>
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
  subtitle: {
    fontSize: 15,
    color: "#555",
    marginBottom: 32,
    lineHeight: 22,
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
    // width: 60,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
});
