import React, { useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, RefreshControl, Image, FlatList, Modal, TextInput, Platform, ActivityIndicator } from 'react-native';
import { useAuthStore } from '@/store/authStore';
import { useExpense } from '@/hooks/useExpense';
import ExpenseItem from '@/components/ExpenseItem';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';

export default function Home() {
    const { user } = useAuthStore();
    const { expenses, fetchExpenses, loading } = useExpense();
    const [refreshing, setRefreshing] = React.useState(false);
    const [monthlyLimit, setMonthlyLimit] = React.useState(50000);
    const [isLimitModalVisible, setIsLimitModalVisible] = React.useState(false);
    const [newLimit, setNewLimit] = React.useState('');
    const router = useRouter();

    useEffect(() => {
        fetchExpenses();
        loadUserProfile();
    }, []);

    const loadUserProfile = async () => {
        if (!user?.uid) return;
        try {
            const { DBService } = require("@/services/firebase/db");
            const profile = await DBService.getUserProfile(user.uid);
            if (profile?.monthlyLimit) {
                setMonthlyLimit(profile.monthlyLimit);
            }
        } catch (error) {
            console.error("Error loading profile:", error);
        }
    };

    const handleUpdateLimit = async () => {
        if (!newLimit || isNaN(Number(newLimit)) || !user?.uid) return;
        try {
            const { DBService } = require("@/services/firebase/db");
            const limit = Number(newLimit);
            await DBService.updateMonthlyLimit(user.uid, limit);
            setMonthlyLimit(limit);
            setIsLimitModalVisible(false);
            setNewLimit('');
        } catch (error) {
            console.error("Error updating limit:", error);
        }
    };

    const onRefresh = async () => {
        setRefreshing(true);
        await Promise.all([fetchExpenses(), loadUserProfile()]);
        setRefreshing(false);
    };

    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);

    const quickActions = [
        { id: '1', name: 'Add', icon: 'add', color: '#6366f1', route: '/add' },
        { id: '2', name: 'Scan', icon: 'scan-outline', color: '#f472b6', route: '/add', disabled: true },
        { id: '3', name: 'Stats', icon: 'bar-chart-outline', color: '#fbbf24', route: '/analytics' },
        { id: '4', name: 'Budget', icon: 'wallet-outline', color: '#22c55e', route: '/(tabs)/budget', disabled: true },
    ];

    return (
        <SafeAreaView className="flex-1 bg-[#fcfdfe]" edges={['top']}>
            <ScrollView 
                className="flex-1"
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#6366f1" />
                }
            >
                {/* Header */}
                <View className="px-6 pt-4 pb-12 flex-row justify-between items-center bg-white rounded-b-[48px] shadow-sm shadow-slate-100">
                    <View className="flex-row items-center">
                        <View className="relative">
                            <View className="w-14 h-14 bg-indigo-500 rounded-2xl items-center justify-center border-2 border-white/20">
                                <Text className="text-white text-2xl font-black">
                                    {(user?.displayName || 'F').charAt(0).toUpperCase()}
                                </Text>
                            </View>
                            <View className="absolute -bottom-1 -right-1 w-5 h-5 bg-success border-2 border-white rounded-full" />
                        </View>
                        <View className="ml-4">
                            <Text className="text-slate-400 text-sm font-medium">Welcome back,</Text>
                            <Text className="text-slate-900 text-xl font-bold">{user?.displayName || 'Faisal Ansari'}</Text>
                        </View>
                    </View>
                    {/* <TouchableOpacity className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center">
                        <Ionicons name="notifications-outline" size={24} color="#1e293b" />
                        <View className="absolute top-3 right-3 w-2 h-2 bg-danger rounded-full border border-white" />
                    </TouchableOpacity> */}
                </View>

                <View className="px-6 -mt-8">
                    {/* Balance Card */}
                    <TouchableOpacity activeOpacity={0.9}>
                        <LinearGradient
                            colors={['#4f46e5', '#6366f1', '#818cf8']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            className="p-8 rounded-[40px] shadow-2xl shadow-primary/40 relative overflow-hidden"
                        >
                            {/* Decorative Background Circles */}
                            <View className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full" />
                            <View className="absolute -bottom-20 -left-10 w-60 h-60 bg-white/5 rounded-full" />

                            <View className="flex-row justify-between items-start">
                                <View>
                                    <Text className="text-indigo-100 text-sm font-bold uppercase tracking-widest">Current Spending</Text>
                                    <Text className="text-white text-5xl font-black mt-2">₹{totalSpent.toLocaleString('en-IN')}</Text>
                                </View>
                                <View className="bg-white/20 p-2 rounded-xl">
                                    <Ionicons name="card-outline" size={24} color="white" />
                                </View>
                            </View>
                            
                            <View className="h-[1px] bg-white/20 my-8" />

                            <View className="flex-row justify-between">
                                <TouchableOpacity 
                                    onPress={() => {
                                        setNewLimit(monthlyLimit.toString());
                                        setIsLimitModalVisible(true);
                                    }}
                                    className="flex-row items-center"
                                >
                                    <View className="w-10 h-10 bg-white/20 rounded-2xl items-center justify-center mr-3">
                                        <Ionicons name="trending-down-outline" size={18} color="white" />
                                    </View>
                                    <View>
                                        <View className="flex-row items-center">
                                            <Text className="text-indigo-100 text-xs font-medium mr-1">Limit</Text>
                                            <Ionicons name="pencil" size={10} color="#e0e7ff" />
                                        </View>
                                        <Text className="text-white font-bold text-base">₹{(monthlyLimit/1000).toFixed(0)}k</Text>
                                    </View>
                                </TouchableOpacity>
                                <View className="flex-row items-center">
                                    <View className="w-10 h-10 bg-white/20 rounded-2xl items-center justify-center mr-3">
                                        <Ionicons name="pie-chart-outline" size={18} color="white" />
                                    </View>
                                    <View>
                                        <Text className="text-indigo-100 text-xs font-medium">Available</Text>
                                        <Text className="text-white font-bold text-base">₹{((monthlyLimit - totalSpent)/1000).toFixed(1)}k</Text>
                                    </View>
                                </View>
                            </View>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>

                {/* Quick Actions */}
                <View className="px-6 mt-10">
                    <Text className="text-slate-900 text-lg font-bold mb-4 ml-1">Quick Actions</Text>
                    <View className="flex-row justify-between">
                        {quickActions.map((action) => (
                            <TouchableOpacity 
                                key={action.id}
                                onPress={() => !action.disabled && router.push(action.route as any)}
                                disabled={action.disabled}
                                className={`items-center ${action.disabled ? 'opacity-40' : ''}`}
                            >
                                <View 
                                    className="w-16 h-16 rounded-3xl items-center justify-center shadow-sm shadow-slate-200 border border-white"
                                    style={{ backgroundColor: action.disabled ? '#f1f5f9' : `${action.color}10` }}
                                >
                                    <Ionicons name={action.icon as any} size={28} color={action.disabled ? '#94a3b8' : action.color} />
                                </View>
                                <Text className="text-slate-600 text-xs font-bold mt-2">{action.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </View>

                {/* Recent Transactions */}
                <View className="px-6 mt-10 pb-12">
                    <View className="flex-row justify-between items-center mb-6">
                        <View className="flex-row items-center">
                            <Text className="text-slate-900 text-xl font-black">Recent Activity</Text>
                            <View className="ml-3 px-2 py-1 bg-slate-100 rounded-lg">
                                <Text className="text-slate-500 text-[10px] font-bold uppercase">{expenses.length}</Text>
                            </View>
                        </View>
                        <TouchableOpacity className="px-4 py-2 bg-slate-50 rounded-xl" onPress={() => router.push('../all-expenses-list-screen')}>
                            <Text className="text-primary font-bold text-sm">View All</Text>
                        </TouchableOpacity>
                    </View>

                    {loading ? (
                        <View className="items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                            <ActivityIndicator size="large" color="#6366f1" />
                        </View>
                    ) : null}

                    {expenses.length > 0 ? (
                        <FlatList
                            data={expenses.slice(0, 3)}
                            keyExtractor={(item) => item.id!}
                            renderItem={({ item }) => <ExpenseItem expense={item} />}
                            scrollEnabled={false}
                        />
                    ) : (
                        <View className="items-center justify-center py-20 bg-white rounded-[40px] border border-dashed border-slate-200">
                            <View className="w-20 h-20 bg-slate-50 rounded-full items-center justify-center mb-6">
                                <Ionicons name="receipt-outline" size={40} color="#94a3b8" />
                            </View>
                            <Text className="text-slate-900 font-bold text-lg">No Activity Yet</Text>
                            <Text className="text-slate-400 mt-2 text-center px-12 leading-5">
                                Your expense history will appear here once you start tracking.
                            </Text>
                            <TouchableOpacity 
                                onPress={() => router.push('../add')}
                                className="mt-8 bg-primary px-8 py-4 rounded-2xl shadow-lg shadow-primary/30"
                            >
                                <Text className="text-white font-bold">Add First Expense</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </ScrollView>
            {/* Update Limit Modal */}
            <Modal
                visible={isLimitModalVisible}
                transparent
                animationType="fade"
                onRequestClose={() => setIsLimitModalVisible(false)}
            >
                <TouchableOpacity 
                    activeOpacity={1} 
                    onPress={() => setIsLimitModalVisible(false)}
                    className="flex-1 bg-black/60 justify-center px-6"
                >
                    <TouchableOpacity 
                        activeOpacity={1}
                        onPress={(e) => e.stopPropagation()}
                        className="bg-white rounded-[40px] p-8 shadow-2xl"
                    >
                        <View className="items-center mb-6">
                            <View className="w-16 h-16 bg-primary/10 rounded-2xl items-center justify-center mb-4">
                                <Ionicons name="wallet-outline" size={32} color="#6366f1" />
                            </View>
                            <Text className="text-slate-900 text-2xl font-bold">Update Budget</Text>
                            <Text className="text-slate-500 mt-1">Set your monthly spending limit</Text>
                        </View>

                        <View className="bg-slate-50 rounded-3xl p-6 mb-8 border border-slate-100">
                            <Text className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2 ml-1">Monthly Salary / Limit</Text>
                            <View className="flex-row items-center">
                                <Text className="text-slate-900 text-3xl font-black mr-2">₹</Text>
                                <TextInput
                                    className="text-slate-900 text-4xl font-black flex-1"
                                    placeholder="0"
                                    keyboardType="numeric"
                                    value={newLimit}
                                    onChangeText={setNewLimit}
                                    autoFocus
                                />
                            </View>
                        </View>

                        <View className="flex-row space-x-4">
                            <TouchableOpacity 
                                onPress={() => setIsLimitModalVisible(false)}
                                className="flex-1 bg-slate-100 py-5 rounded-2xl"
                            >
                                <Text className="text-slate-600 text-center font-bold text-lg">Cancel</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={handleUpdateLimit}
                                className="flex-1 bg-primary py-5 rounded-2xl shadow-lg shadow-primary/30"
                            >
                                <Text className="text-white text-center font-bold text-lg">Save</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableOpacity>
                </TouchableOpacity>
            </Modal>
        </SafeAreaView>
    );
}