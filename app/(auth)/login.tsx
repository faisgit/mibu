import { useAuth } from "@/hooks/useauth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        await login(email, password);
        router.replace("/(tabs)/home");
    };

    return (
        // <View style={{ padding: 20 }}>
        //   <Text>Login</Text>

        //   <TextInput
        //     placeholder="Email"
        //     value={email}
        //     onChangeText={setEmail}
        //     style={{ borderWidth: 1 }}
        //   />

        //   <TextInput
        //     placeholder="Password"
        //     value={password}
        //     onChangeText={setPassword}
        //     secureTextEntry
        //     style={{ borderWidth: 1, marginTop: 10 }}
        //   />

        //   <Button title="Login" onPress={handleLogin} />

        //   <Text onPress={() => router.push("/register")}>
        //     Go to Register
        //   </Text>
        // </View>

        <SafeAreaView>
            <View className="bg-blue-400 h-screen w-full"></View>
        </SafeAreaView>
    );
}