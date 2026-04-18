import { AuthService } from "@/services/firebase/auth";
import { useAuthStore } from "@/store/authstore";
import { useRouter } from "expo-router";

import { useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function Index() {
  const router =  useRouter();
  const {setUser} = useAuthStore();
  useEffect(()=> {
    const unsubscribe = AuthService.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        router.replace('/(tabs)/home')
      } else {
        setUser(null);
        router.replace('/(auth)/login')
      }
    })
    return unsubscribe;
  },[])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ActivityIndicator size={50} color="#000" />
    </View>
  );
}
