import { useAuth } from "@/hooks/useauth";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Text, View, KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInDown, FadeInUp } from "react-native-reanimated";

export default function Register() {
    const router = useRouter();
    const { signUp } = useAuth();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleRegister = async () => {
        if (!name || !email || !password) {
            setError("Please fill in all fields");
            return;
        }
        setLoading(true);
        setError("");
        try {
            await signUp(name, email, password);
            router.replace("/(tabs)/home");
        } catch (e: any) {
            setError(e.message || "Failed to register");
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
                            <View className="w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center">
                                <Ionicons name="person-add" size={32} color="#6366f1" />
                            </View>
                            <Text className="text-3xl font-bold text-secondary mt-4">Create Account</Text>
                            <Text className="text-muted text-base mt-1">Start tracking your finances today</Text>
                        </Animated.View>

                        {/* Form Section */}
                        <Animated.View 
                            entering={FadeInDown.delay(400).duration(1000)}
                            className="w-full"
                        >
                            <Input
                                label="Full Name"
                                placeholder="John Doe"
                                value={name}
                                onChangeText={setName}
                                icon={<Ionicons name="person-outline" size={20} color="#64748b" />}
                            />
                            
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

                            <Button 
                                title="Create Account" 
                                onPress={handleRegister} 
                                loading={loading}
                                className="mb-6 mt-2"
                            />

                            <View className="flex-row justify-center items-center">
                                <Text className="text-muted text-base">Already have an account? </Text>
                                <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
                                    <Text className="text-primary font-bold text-base">Login</Text>
                                </TouchableOpacity>
                            </View>
                        </Animated.View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}