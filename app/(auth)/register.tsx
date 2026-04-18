import { useState } from "react";
import { View, TextInput, Button, Text } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useauth";


export default function Register() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    await signUp(name, email, password);
    router.replace("/(tabs)/home");
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Register</Text>

      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={{ borderWidth: 1 }}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        style={{ borderWidth: 1, marginTop: 10 }}
      />

      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ borderWidth: 1, marginTop: 10 }}
      />

      <Button title="Register" onPress={handleRegister} />

      <Text onPress={() => router.push("/login")}>
        Go to Login
      </Text>
    </View>
  );
}