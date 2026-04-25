import { useAuth } from "@/hooks/useauth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function Login() {
    const router = useRouter();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        if (!email || !password) {
            setError("Please fill in all fields");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await login(email, password);
            router.replace("/(tabs)/home");
        } catch (e: any) {
            setError(e.message || "Failed to login");
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-background">
            <KeyboardAvoidingView 
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                className="flex-1"
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} className="px-6">
                    <View className="flex-1 justify-center py-12">
                        {/* Logo/Icon section */}
                        <Animated.View 
                            entering={FadeInUp.delay(200).duration(1000)}
                            className="items-center mb-10"
                        >
                            <View className="w-20 h-20 bg-primary rounded-3xl items-center justify-center shadow-lg shadow-primary/30">
                                <Ionicons name="wallet" size={40} color="white" />
                            </View>
                            <Text className="text-3xl font-bold text-secondary mt-4">Mibu</Text>
                            <Text className="text-muted text-base mt-1">Track your expenses effortlessly</Text>
                        </Animated.View>

                        {/* Form Section */}
                        <Animated.View 
                            entering={FadeInDown.delay(400).duration(1000)}
                            className="w-full"
                        >
                            <Text className="text-2xl font-bold text-secondary mb-6">Welcome Back</Text>
                            
                            <Input
                                label="Email Address"
                                placeholder="name@example.com"
                                value={email}
                                onChangeText={setEmail}
                                keyboardType="email-address"
                                autoCapitalize="none"
                                icon={<Ionicons name="mail-outline" size={20} color="#64748b" />}
                            />

                            <Input
                                label="Password"
                                placeholder="••••••••"
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                icon={<Ionicons name="lock-closed-outline" size={20} color="#64748b" />}
                            />

                            {error ? (
                                <Text className="text-danger text-sm mb-4 ml-1">{error}</Text>
                            ) : null}

                            <TouchableOpacity className="self-end mb-6">
                                <Text className="text-primary font-medium">Forgot Password?</Text>
                            </TouchableOpacity>

                            <Button 
                                title="Login" 
                                onPress={handleLogin} 
                                loading={loading}
                                className="mb-6"
                            />

                            <View className="flex-row justify-center items-center">
                                <Text className="text-muted text-base">Don't have an account? </Text>
                                <TouchableOpacity onPress={() => router.push("/(auth)/register")}>
                                    <Text className="text-primary font-bold text-base">Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}