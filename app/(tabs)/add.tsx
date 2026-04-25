import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import Animated, { FadeInDown } from 'react-native-reanimated';

const CATEGORIES = [
  { id: 'food', name: 'Food', icon: 'fast-food' },
  { id: 'travel', name: 'Travel', icon: 'airplane' },
  { id: 'shopping', name: 'Shopping', icon: 'cart' },
  { id: 'entertainment', name: 'Entertainment', icon: 'game-controller' },
  { id: 'health', name: 'Health', icon: 'medical' },
  { id: 'other', name: 'Other', icon: 'cash' },
];

export default function AddExpense() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('food');
  const [note, setNote] = useState('');

  const handleAddExpense = () => {
    // Logic to add expense would go here
    router.back();
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="px-6 py-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
          <Ionicons name="close" size={28} color="#1e293b" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-secondary">Add Expense</Text>
        <View className="w-10" />
      </View>

      <ScrollView className="px-6" showsVerticalScrollIndicator={false}>
        <Animated.View entering={FadeInDown.delay(200).duration(800)}>
          {/* Amount Input */}
          <View className="items-center my-10">
            <Text className="text-muted font-medium mb-2">Enter Amount</Text>
            <View className="flex-row items-center">
              <Text className="text-4xl font-bold text-secondary">₹</Text>
              <TextInput
                autoFocus
                keyboardType="numeric"
                value={amount}
                onChangeText={setAmount}
                placeholder="0"
                className="text-6xl font-bold text-primary ml-2 min-w-[100px] text-center"
                placeholderTextColor="#e2e8f0"
              />
            </View>
          </View>

          {/* Category Picker */}
          <Text className="text-secondary font-bold text-lg mb-4">Category</Text>
          <View className="flex-row flex-wrap justify-between mb-8">
            {CATEGORIES.map((cat) => (
              <TouchableOpacity
                key={cat.id}
                onPress={() => setSelectedCategory(cat.id)}
                className={`w-[30%] aspect-square rounded-3xl items-center justify-center mb-4 border-2 ${
                  selectedCategory === cat.id
                    ? 'border-primary bg-primary/5'
                    : 'border-slate-100 bg-white'
                }`}
              >
                <Ionicons
                  name={cat.icon as any}
                  size={28}
                  color={selectedCategory === cat.id ? '#6366f1' : '#94a3b8'}
                />
                <Text
                  className={`text-xs mt-2 font-medium ${
                    selectedCategory === cat.id ? 'text-primary' : 'text-muted'
                  }`}
                >
                  {cat.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Note Input */}
          <Input
            label="Note (Optional)"
            placeholder="What was this for?"
            value={note}
            onChangeText={setNote}
            icon={<Ionicons name="document-text-outline" size={20} color="#64748b" />}
          />

          {/* Date Selector (Simplified) */}
          <TouchableOpacity className="flex-row items-center justify-between bg-white h-14 px-4 rounded-2xl border border-slate-200 mb-10 shadow-sm">
            <View className="flex-row items-center">
              <Ionicons name="calendar-outline" size={20} color="#64748b" />
              <Text className="text-secondary font-medium ml-3">Today, 22 April 2026</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
          </TouchableOpacity>

          <Button
            title="Add Expense"
            onPress={handleAddExpense}
            disabled={!amount}
            className="mb-10"
          />
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
