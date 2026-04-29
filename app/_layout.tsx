import { AuthService } from "@/services/firebase/auth";
import { useAuthStore } from "@/store/authStore";
import { Stack, useRouter, useSegments } from 'expo-router';
import { useEffect, useState } from "react";
import 'react-native-reanimated';
import "./global.css";

export const unstable_settings = {
  initialRouteName: "index",
};

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const { setUser, user } = useAuthStore();
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      setUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, [setUser]);

  useEffect(() => {
    if (initializing) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Not logged in and not in the auth group -> go to login
      router.replace('/(auth)/login');
    } else if (user && (inAuthGroup || !segments[0])) {
      // Logged in and in auth group or at root -> go to home
      router.replace('/(tabs)/home');
    }
  }, [user, initializing, segments, router]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="(auth)" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="add" />
      <Stack.Screen name="analytics" />
    </Stack>
  );
}