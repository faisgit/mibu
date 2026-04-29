import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useExpense } from '@/hooks/useExpense';
import { CATEGORIES } from '@/components/CategoryIcon';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
const SCREEN_WIDTH = Dimensions.get('window').width;

export default function Analytics() {
    const { expenses } = useExpense();
    const router = useRouter();
    
    const totalSpent = expenses.reduce((acc, curr) => acc + curr.amount, 0);
    
    // Group by category
    const categoryTotals = expenses.reduce((acc, curr) => {
        acc[curr.category] = (acc[curr.category] || 0) + curr.amount;
        return acc;
    }, {} as Record<string, number>);

    const sortedCategories = Object.entries(categoryTotals)
        .sort(([, a], [, b]) => b - a);

    return (
        <SafeAreaView className="flex-1 bg-secondary" edges={['top']}>
            <View className="px-6 py-4 flex-row items-center bg-white">
                <TouchableOpacity 
                    onPress={() => router.back()} 
                    className="w-10 h-10 items-center justify-center bg-slate-50 rounded-xl mr-4 border border-slate-100"
                >
                    <Ionicons name="arrow-back" size={24} color="#1e293b" />
                </TouchableOpacity>
                <Text className="text-slate-900 text-2xl font-bold">Analytics</Text>
            </View>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                <View className="px-6 pt-4 pb-10 bg-white rounded-b-4xl shadow-sm shadow-slate-100">
                    <Text className="text-slate-500 mt-1 text-lg">Your spending habits</Text>
                </View>

                <View className="px-6 -mt-8">
                    <View className="bg-white p-6 rounded-4xl shadow-lg shadow-slate-200">
                        <View className="flex-row justify-between items-center mb-6">
                            <Text className="text-slate-900 text-lg font-bold">Spending by Category</Text>
                            <View className="bg-slate-100 px-3 py-1 rounded-full">
                                <Text className="text-slate-500 text-xs font-bold">This Month</Text>
                            </View>
                        </View>

                        {sortedCategories.length > 0 ? (
                            sortedCategories.map(([cat, amount], index) => {
                                const percentage = (amount / totalSpent) * 100;
                                const config = CATEGORIES[cat as keyof typeof CATEGORIES] || CATEGORIES.Other;
                                return (
                                    <View key={cat} className="mb-5">
                                        <View className="flex-row justify-between items-center mb-2">
                                            <View className="flex-row items-center">
                                                <View className="w-2 h-2 rounded-full mr-2" style={{ backgroundColor: config.color }} />
                                                <Text className="text-slate-700 font-medium">{cat}</Text>
                                            </View>
                                            <Text className="text-slate-900 font-bold">₹{amount.toLocaleString('en-IN')}</Text>
                                        </View>
                                        <View className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                                            <View 
                                                className="h-full rounded-full" 
                                                style={{ 
                                                    width: `${percentage}%`, 
                                                    backgroundColor: config.color 
                                                }} 
                                            />
                                        </View>
                                    </View>
                                );
                            })
                        ) : (
                            <View className="items-center justify-center py-10">
                                <Text className="text-slate-400">No data available</Text>
                            </View>
                        )}
                    </View>

                    {/* Summary Cards */}
                    <View className="flex-row justify-between mt-6 pb-10">
                        <View className="bg-white p-5 rounded-3xl shadow-sm shadow-slate-200 w-[48%]">
                            <View className="w-10 h-10 bg-success/10 rounded-xl items-center justify-center mb-3">
                                <Ionicons name="trending-down" size={20} color="#22c55e" />
                            </View>
                            <Text className="text-slate-500 text-sm">Avg. Daily</Text>
                            <Text className="text-slate-900 text-xl font-bold mt-1">₹{(totalSpent / 30).toFixed(0)}</Text>
                        </View>
                        
                        <View className="bg-white p-5 rounded-3xl shadow-sm shadow-slate-200 w-[48%]">
                            <View className="w-10 h-10 bg-primary/10 rounded-xl items-center justify-center mb-3">
                                <Ionicons name="flash" size={20} color="#6366f1" />
                            </View>
                            <Text className="text-slate-500 text-sm">Top Category</Text>
                            <Text className="text-slate-900 text-xl font-bold mt-1" numberOfLines={1}>
                                {sortedCategories[0]?.[0] || 'N/A'}
                            </Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
