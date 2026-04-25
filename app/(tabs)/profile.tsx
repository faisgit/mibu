import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/hooks/useauth';
import { useRouter } from 'expo-router';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { useAuthStore } from '@/store/authstore';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function Profile() {
  const router = useRouter();
  const { logout } = useAuth();
  const user = useAuthStore((state) => state.user);
  const [isDarkMode, setIsDarkMode] = React.useState(false);

  const handleLogout = async () => {
    await logout();
    router.replace('/(auth)/login');
  };

  const menuItems = [
    { icon: 'notifications-outline', label: 'Notifications', value: 'On' },
    { icon: 'shield-checkmark-outline', label: 'Security', value: null },
    { icon: 'help-circle-outline', label: 'Help & Support', value: null },
    { icon: 'information-circle-outline', label: 'About Mibu', value: 'v1.0.0' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        <View className="py-6 items-center">
            <Animated.View entering={FadeInDown.delay(200).duration(800)} className="items-center">
                <View className="w-24 h-24 bg-primary/10 rounded-full items-center justify-center mb-4 border-4 border-white shadow-sm">
                    <Text className="text-3xl font-bold text-primary">
                        {user?.name?.[0]?.toUpperCase() || 'F'}
                    </Text>
                </View>
                <Text className="text-2xl font-bold text-secondary">{user?.name || 'Faisal Ansari'}</Text>
                <Text className="text-muted text-base">{user?.email || 'faisal@example.com'}</Text>
                
                <TouchableOpacity className="mt-4 px-6 py-2 bg-white rounded-full border border-slate-200 shadow-sm">
                    <Text className="text-primary font-semibold">Edit Profile</Text>
                </TouchableOpacity>
            </Animated.View>
        </View>

        <Animated.View entering={FadeInDown.delay(400).duration(800)}>
            <Text className="text-lg font-bold text-secondary mb-4 mt-4">Settings</Text>
            <Card className="p-2 mb-6">
                <View className="flex-row items-center justify-between p-4 border-b border-slate-50">
                    <View className="flex-row items-center">
                        <View className="bg-secondary/5 w-10 h-10 rounded-xl items-center justify-center mr-4">
                            <Ionicons name="moon-outline" size={20} color="#1e293b" />
                        </View>
                        <Text className="text-secondary font-medium">Dark Mode</Text>
                    </View>
                    <Switch 
                        value={isDarkMode} 
                        onValueChange={setIsDarkMode}
                        trackColor={{ false: '#e2e8f0', true: '#6366f1' }}
                    />
                </View>

                {menuItems.map((item, index) => (
                    <TouchableOpacity 
                        key={index} 
                        className={`flex-row items-center justify-between p-4 ${
                            index === menuItems.length - 1 ? '' : 'border-b border-slate-50'
                        }`}
                    >
                        <View className="flex-row items-center">
                            <View className="bg-secondary/5 w-10 h-10 rounded-xl items-center justify-center mr-4">
                                <Ionicons name={item.icon as any} size={20} color="#1e293b" />
                            </View>
                            <Text className="text-secondary font-medium">{item.label}</Text>
                        </View>
                        <View className="flex-row items-center">
                            {item.value && (
                                <Text className="text-muted text-sm mr-2">{item.value}</Text>
                            )}
                            <Ionicons name="chevron-forward" size={18} color="#94a3b8" />
                        </View>
                    </TouchableOpacity>
                ))}
            </Card>

            <Button
                title="Logout"
                onPress={handleLogout}
                variant="outline"
                className="mb-10"
                icon={<Ionicons name="log-out-outline" size={20} color="#6366f1" />}
            />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
