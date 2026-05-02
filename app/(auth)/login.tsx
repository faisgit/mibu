import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { TextInput, TouchableOpacity, Text, View, Alert, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";


export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        if (!email.trim() || !password) {
            Alert.alert("Error", "Please enter both email and password.");
            return;
        }
        setIsLoading(true);
        try {
            await login(email, password);
            router.replace("../(tabs)/home");
        } catch (error: any) {
            console.error(error);
            let errorMessage = "An unexpected error occurred. Please try again.";
            
            if (error.code === 'auth/invalid-credential' || error.code === 'auth/wrong-password' || error.code === 'auth/user-not-found') {
                errorMessage = "Incorrect email or password.";
            } else if (error.message) {
                errorMessage = error.message;
            }
            
            Alert.alert("Login Failed", errorMessage);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="flex-1 px-8 justify-center">
                <View className="mb-12 items-center">
                    <View className="w-20 h-20 bg-primary rounded-3xl items-center justify-center shadow-xl shadow-primary/30 mb-6">
                        <Text className="text-white text-3xl font-bold italic">M</Text>
                    </View>
                    <Text className="text-4xl font-bold text-slate-900 tracking-tight">Welcome Back</Text>
                    <Text className="text-slate-500 mt-2 text-lg">Sign in to Mibu to continue</Text>
                </View>

                <View className="space-y-5">
                    <View>
                        <Text className="text-slate-700 mb-2 font-semibold ml-1">Email Address</Text>
                        <TextInput
                            placeholder="name@example.com"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                            placeholderTextColor="#94a3b8"
                            className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-base"
                        />
                    </View>

                    <View className="mt-4">
                        <Text className="text-slate-700 mb-2 font-semibold ml-1">Password</Text>
                        <TextInput
                            placeholder="Enter your password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                            placeholderTextColor="#94a3b8"
                            className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-base"
                        />
                    </View>
                </View>

                <TouchableOpacity 
                    onPress={handleLogin}
                    disabled={isLoading}
                    activeOpacity={0.8}
                    className={`rounded-2xl py-5 mt-10 shadow-lg shadow-primary/40 ${isLoading ? 'bg-primary-light' : 'bg-primary'}`}
                >
                    {isLoading ? <ActivityIndicator color="#fff" /> : (
                        <Text className="text-white text-center font-bold text-lg">
                            Login
                        </Text>
                    )}
                </TouchableOpacity>

                <View className="flex-row justify-center mt-10">
                    <Text className="text-slate-500 text-base">Don&apos;t have an account? </Text>
                    <TouchableOpacity onPress={() => router.push("/register")}>
                        <Text className="text-primary font-bold text-base">Register</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}