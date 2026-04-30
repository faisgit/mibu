import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useRouter } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'
import { useExpense } from '@/hooks/useExpense'
import { useEffect } from 'react'
import ExpenseItem from '@/components/ExpenseItem'

const AllExpensesListScreen = () => {
    const router = useRouter()

    const {expenses, fetchExpenses, loading} = useExpense();

    const handleBack = () => {
        router.back();
    }

    useEffect(() => {
        fetchExpenses();
    }, []);

    if (loading) {
        return (
            <View className="flex-1 items-center justify-center bg-white">
                <ActivityIndicator size="large" color="#6366f1" />
            </View>
        );
    }

    if (!expenses || expenses.length === 0) {
        return (
            <SafeAreaView className="flex-1 bg-white">
                <View className="px-6 py-4 flex-row items-center border-b border-slate-100">
                    <TouchableOpacity 
                        onPress={handleBack} 
                        className="w-10 h-10 items-center justify-center bg-slate-50 rounded-xl mr-4 border border-slate-100"
                    >
                        <Ionicons name="arrow-back" size={24} color="#1e293b" />
                    </TouchableOpacity>
                    <Text className="text-slate-900 text-2xl font-bold">All Expenses</Text>
                </View>
                <View className="flex-1 items-center justify-center p-6">
                    <Ionicons name="receipt-outline" size={64} color="#cbd5e1" />
                    <Text className="text-slate-900 text-xl font-bold mt-4">No expenses found</Text>
                    <Text className="text-slate-500 text-center mt-2">You haven't added any expenses yet.</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView className="flex-1 bg-white">
            <View className="px-6 py-4 flex-row items-center border-b border-slate-100">
                <TouchableOpacity 
                    onPress={handleBack} 
                    className="w-10 h-10 items-center justify-center bg-slate-50 rounded-xl mr-4 border border-slate-100"
                >
                    <Ionicons name="arrow-back" size={24} color="#1e293b" />
                </TouchableOpacity>
                <Text className="text-slate-900 text-2xl font-bold">All Expenses</Text>
            </View>

            <FlatList
                data={expenses}
                keyExtractor={(item) => item.id!}
                renderItem={({ item }) => (
                    <View className="px-6">
                        <ExpenseItem expense={item} />
                    </View>
                )}
                contentContainerStyle={{ paddingVertical: 16 }}
                showsVerticalScrollIndicator={false}
            />
        </SafeAreaView>
    )
}

export default AllExpensesListScreen