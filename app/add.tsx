import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useExpense } from '@/hooks/useExpense';
import { CATEGORIES } from '@/components/CategoryIcon';
import { Ionicons } from '@expo/vector-icons';

export default function AddExpense() {
    const router = useRouter();
    const { addExpense } = useExpense();
    
    const [amount, setAmount] = useState('');
    const [category, setCategory] = useState('Food');
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleAdd = async () => {
        if (!amount || isNaN(Number(amount))) return;
        
        setIsLoading(true);
        try {
            await addExpense({
                amount: Number(amount),
                category,
                note,
                date: new Date(),
            });
            router.back();
        } catch (error) {
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <View className="px-6 pt-4 flex-row justify-between items-center">
                    <TouchableOpacity onPress={() => router.back()} className="w-10 h-10 items-center justify-center bg-slate-100 rounded-xl">
                        <Ionicons name="close" size={24} color="#1e293b" />
                    </TouchableOpacity>
                    <Text className="text-slate-900 text-xl font-bold">Add Expense</Text>
                    <View className="w-10" />
                </View>

                <ScrollView className="flex-1 px-6 mt-10">
                    <View className="items-center mb-10">
                        <Text className="text-slate-400 text-base mb-2">Enter Amount</Text>
                        <View className="flex-row items-center">
                            <Text className="text-slate-900 text-4xl font-bold mr-2">₹</Text>
                            <TextInput
                                className="text-slate-900 text-5xl font-bold min-w-[100px]"
                                placeholder="0"
                                placeholderTextColor="#cbd5e1"
                                keyboardType="numeric"
                                value={amount}
                                onChangeText={setAmount}
                                autoFocus
                            />
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-slate-900 text-lg font-bold mb-4">Category</Text>
                        <View className="flex-row flex-wrap">
                            {Object.keys(CATEGORIES).map((cat) => {
                                const isSelected = category === cat;
                                const config = CATEGORIES[cat as keyof typeof CATEGORIES];
                                return (
                                    <TouchableOpacity
                                        key={cat}
                                        onPress={() => setCategory(cat)}
                                        className={`mr-3 mb-3 px-4 py-3 rounded-2xl flex-row items-center ${isSelected ? 'bg-primary' : 'bg-slate-50 border border-slate-100'}`}
                                    >
                                        <Ionicons 
                                            name={config.icon as any} 
                                            size={18} 
                                            color={isSelected ? 'white' : config.color} 
                                        />
                                        <Text className={`ml-2 font-semibold ${isSelected ? 'text-white' : 'text-slate-600'}`}>
                                            {cat}
                                        </Text>
                                    </TouchableOpacity>
                                );
                            })}
                        </View>
                    </View>

                    <View className="mb-8">
                        <Text className="text-slate-900 text-lg font-bold mb-4">Note (Optional)</Text>
                        <TextInput
                            className="bg-slate-50 border border-slate-100 rounded-3xl px-5 py-4 text-slate-900 text-base"
                            placeholder="What was this for?"
                            placeholderTextColor="#94a3b8"
                            value={note}
                            onChangeText={setNote}
                            multiline
                        />
                    </View>

                    <TouchableOpacity
                        onPress={handleAdd}
                        disabled={isLoading}
                        activeOpacity={0.8}
                        className={`rounded-3xl py-5 shadow-lg shadow-primary/30 mb-10 ${isLoading ? 'bg-primary-light' : 'bg-primary'}`}
                    >
                        <Text className="text-white text-center font-bold text-xl">
                            {isLoading ? 'Saving...' : 'Save Expense'}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}
