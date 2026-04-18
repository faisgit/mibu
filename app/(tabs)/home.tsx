import { useAuth } from '@/hooks/useauth';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function Home() {
    const router = useRouter();
    const { logout } = useAuth();

    const handleLogout = async () => {
        await logout();
        router.replace("/(auth)/login")
    }
    return (
        <View style={{ justifyContent: "center", alignItems: "center", flex: 1 }}>
            <TouchableOpacity onPress={handleLogout}>
                <Text>Logout</Text>
            </TouchableOpacity>
        </View>
    )
}