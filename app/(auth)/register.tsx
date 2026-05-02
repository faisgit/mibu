import { useState } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@/hooks/useAuth";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Register() {
  const router = useRouter();
  const { signUp } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!name.trim() || !email.trim() || !password) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters long.");
      return;
    }

    setIsLoading(true);
    try {
      await signUp(name, email, password);
      router.replace("../(tabs)/home");
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView className="flex-1" behavior="padding">
        <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}>
          <View className="flex-1 px-8 justify-center py-12">
            <View className="mb-12 items-center">
              <View className="w-20 h-20 bg-primary rounded-3xl items-center justify-center shadow-xl shadow-primary/30 mb-6">
                <Text className="text-white text-3xl font-bold italic">M</Text>
              </View>
              <Text className="text-4xl font-bold text-slate-900 tracking-tight">
                Create Account
              </Text>
              <Text className="text-slate-500 mt-2 text-lg">
                Join Mibu to track your expenses
              </Text>
            </View>

            <View className="space-y-4">
              <View>
                <Text className="text-slate-700 mb-2 font-semibold ml-1">
                  Full Name
                </Text>
                <TextInput
                  placeholder="John Doe"
                  value={name}
                  onChangeText={setName}
                  placeholderTextColor="#94a3b8"
                  className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-base"
                />
              </View>

              <View className="mt-4">
                <Text className="text-slate-700 mb-2 font-semibold ml-1">
                  Email Address
                </Text>
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
                <Text className="text-slate-700 mb-2 font-semibold ml-1">
                  Password
                </Text>
                <TextInput
                  placeholder="Create a password"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  placeholderTextColor="#94a3b8"
                  className="bg-slate-50 border border-slate-100 rounded-2xl px-5 py-4 text-slate-900 text-base"
                />
              </View>
            </View>

            <TouchableOpacity
              onPress={handleRegister}
              disabled={isLoading}
              activeOpacity={0.8}
              className={`rounded-2xl py-5 mt-10 shadow-lg shadow-primary/40 ${isLoading ? "bg-primary-light" : "bg-primary"}`}
            >
                {isLoading ? <ActivityIndicator color="#fff" /> : (
                    <Text className="text-white text-center font-bold text-lg">
                        Register
                    </Text>
                )}
            </TouchableOpacity>

            <View className="flex-row justify-center mt-10">
              <Text className="text-slate-500 text-base">
                Already have an account?{" "}
              </Text>
              <TouchableOpacity onPress={() => router.push("/login")}>
                <Text className="text-primary font-bold text-base">Login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
