import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import { ExpenseItem } from '@/components/ExpenseItem';
import Animated, { FadeInRight, FadeInUp } from 'react-native-reanimated';
import { useAuthStore } from '@/store/authstore';

export default function Home() {
    const user = useAuthStore((state) => state.user);

    const recentExpenses = [
        { id: '1', category: 'Food', amount: '450', date: 'Today, 2:30 PM', note: 'Dinner with friends' },
        { id: '2', category: 'Travel', amount: '120', date: 'Yesterday, 9:00 AM', note: 'Bus ticket' },
        { id: '3', category: 'Shopping', amount: '2500', date: '21 Apr 2026', note: 'New shoes' },
        { id: '4', category: 'Entertainment', amount: '800', date: '20 Apr 2026', note: 'Movie tickets' },
        { id: '5', category: 'Health', amount: '1200', date: '19 Apr 2026', note: 'Pharmacy' },
    ];

    return (
        <SafeAreaView className="flex-1 bg-background">
            <ScrollView 
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                {/* Header */}
                <View className="px-6 py-6 flex-row justify-between items-center">
                    <View>
                        <Text className="text-muted text-base">Welcome back,</Text>
                        <Text className="text-2xl font-bold text-secondary">
                            {user?.name || 'Faisal'} 👋
                        </Text>
                    </View>
                    <TouchableOpacity className="w-12 h-12 bg-white rounded-2xl items-center justify-center shadow-sm">
                        <Ionicons name="notifications-outline" size={24} color="#1e293b" />
                    </TouchableOpacity>
                </View>

                {/* Balance Card */}
                <Animated.View 
                    entering={FadeInUp.delay(200).duration(800)}
                    className="px-6 mb-8"
                >
                    <Card className="bg-primary p-6 shadow-xl shadow-primary/30">
                        <View className="flex-row justify-between items-start mb-6">
                            <View>
                                <Text className="text-white/80 text-sm font-medium mb-1">Total Balance</Text>
                                <Text className="text-white text-4xl font-bold">₹45,250</Text>
                            </View>
                            <View className="bg-white/20 p-2 rounded-xl">
                                <Ionicons name="wallet-outline" size={24} color="white" />
                            </View>
                        </View>
                        <View className="flex-row justify-between">
                            <View>
                                <Text className="text-white/60 text-xs mb-1">Monthly Income</Text>
                                <View className="flex-row items-center">
                                    <Ionicons name="arrow-up" size={12} color="#4ade80" />
                                    <Text className="text-white font-semibold ml-1">₹60,000</Text>
                                </View>
                            </View>
                            <View className="w-px h-8 bg-white/20" />
                            <View>
                                <Text className="text-white/60 text-xs mb-1">Monthly Spent</Text>
                                <View className="flex-row items-center">
                                    <Ionicons name="arrow-down" size={12} color="#f87171" />
                                    <Text className="text-white font-semibold ml-1">₹14,750</Text>
                                </View>
                            </View>
                        </View>
                    </Card>
                </Animated.View>

                {/* Recent Expenses Section */}
                <View className="px-6 flex-1">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="text-xl font-bold text-secondary">Recent Transactions</Text>
                        <TouchableOpacity>
                            <Text className="text-primary font-semibold">See All</Text>
                        </TouchableOpacity>
                    </View>

                    {recentExpenses.map((expense, index) => (
                        <Animated.View 
                            key={expense.id}
                            entering={FadeInRight.delay(400 + index * 100).duration(600)}
                        >
                            <ExpenseItem 
                                category={expense.category}
                                amount={expense.amount}
                                date={expense.date}
                                note={expense.note}
                            />
                        </Animated.View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}