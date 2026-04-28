import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, ScrollView } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { useAuth } from '@/hooks/useAuth';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Profile() {
    const { user } = useAuthStore();
    const { logout } = useAuth();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        router.replace("../(auth)/login");
    };

    const menuItems = [
        { icon: 'person-outline', label: 'Edit Profile', color: '#6366f1' },
        { icon: 'notifications-outline', label: 'Notifications', color: '#fbbf24' },
        { icon: 'shield-checkmark-outline', label: 'Security', color: '#34d399' },
        { icon: 'help-circle-outline', label: 'Help & Support', color: '#60a5fa' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-secondary">
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Header Profile Section */}
                <View className="px-6 pt-10 pb-12 bg-white rounded-b-4xl shadow-sm shadow-slate-100 items-center">
                    <View className="w-32 h-32 bg-primary/10 rounded-full items-center justify-center border-4 border-white shadow-xl shadow-slate-200">
                        {user?.photoURL ? (
                            <Image source={{ uri: user.photoURL }} className="w-full h-full rounded-full" />
                        ) : (
                            <Text className="text-primary text-5xl font-bold">
                                {user?.displayName?.[0] || user?.email?.[0]?.toUpperCase() || 'U'}
                            </Text>
                        )}
                    </View>
                    <Text className="text-slate-900 text-3xl font-bold mt-6">{user?.displayName || 'User Name'}</Text>
                    <Text className="text-slate-500 text-lg mt-1">{user?.email}</Text>
                    
                    <TouchableOpacity className="mt-6 bg-slate-100 px-6 py-3 rounded-2xl flex-row items-center">
                        <Ionicons name="pencil" size={18} color="#475569" />
                        <Text className="ml-2 text-slate-600 font-bold">Edit Profile</Text>
                    </TouchableOpacity>
                </View>

                {/* Menu Items */}
                <View className="px-6 mt-8">
                    <View className="bg-white rounded-4xl p-2 shadow-sm shadow-slate-100">
                        {menuItems.map((item, index) => (
                            <TouchableOpacity 
                                key={item.label} 
                                className={`flex-row items-center justify-between p-5 ${index !== menuItems.length - 1 ? 'border-b border-slate-50' : ''}`}
                            >
                                <View className="flex-row items-center">
                                    <View 
                                        className="w-10 h-10 rounded-xl items-center justify-center"
                                        style={{ backgroundColor: `${item.color}15` }}
                                    >
                                        <Ionicons name={item.icon as any} size={22} color={item.color} />
                                    </View>
                                    <Text className="ml-4 text-slate-700 text-lg font-medium">{item.label}</Text>
                                </View>
                                <Ionicons name="chevron-forward" size={20} color="#cbd5e1" />
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Logout Button */}
                    <TouchableOpacity 
                        onPress={handleLogout}
                        className="mt-10 mb-20 bg-danger/10 py-5 rounded-3xl flex-row items-center justify-center"
                    >
                        <Ionicons name="log-out-outline" size={24} color="#ef4444" />
                        <Text className="ml-3 text-danger font-bold text-xl">Logout</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
