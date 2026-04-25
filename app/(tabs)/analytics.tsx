import React from 'react';
import { View, Text, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Card } from '@/components/ui/Card';
import Animated, { FadeInUp } from 'react-native-reanimated';

const { width } = Dimensions.get('window');

export default function Analytics() {
  const categories = [
    { name: 'Food', amount: '₹4,500', percentage: 35, color: '#f97316' },
    { name: 'Travel', amount: '₹2,200', percentage: 20, color: '#06b6d4' },
    { name: 'Shopping', amount: '₹3,800', percentage: 25, color: '#8b5cf6' },
    { name: 'Entertainment', amount: '₹1,500', percentage: 12, color: '#ec4899' },
    { name: 'Other', amount: '₹1,000', percentage: 8, color: '#6366f1' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="px-6 pb-20" showsVerticalScrollIndicator={false}>
        <View className="py-6">
          <Text className="text-2xl font-bold text-secondary">Analytics</Text>
          <Text className="text-muted mt-1">Your spending patterns this month</Text>
        </View>

        {/* Month Selector */}
        <View className="flex-row items-center justify-center mb-8 bg-white p-2 rounded-2xl shadow-sm border border-slate-100">
          <TouchableOpacity className="p-2">
            <Ionicons name="chevron-back" size={20} color="#1e293b" />
          </TouchableOpacity>
          <Text className="mx-6 font-bold text-secondary">April 2026</Text>
          <TouchableOpacity className="p-2">
            <Ionicons name="chevron-forward" size={20} color="#1e293b" />
          </TouchableOpacity>
        </View>

        {/* Pie Chart Placeholder */}
        <Animated.View entering={FadeInUp.delay(200).duration(800)}>
          <Card className="items-center py-8 mb-8">
            <View className="w-48 h-48 rounded-full border-[20px] border-primary/10 items-center justify-center">
                <View className="items-center">
                    <Text className="text-muted text-xs uppercase font-bold tracking-widest">Spent</Text>
                    <Text className="text-2xl font-bold text-secondary">₹14,750</Text>
                </View>
                {/* Visual indicator of slices could be added here with SVG */}
            </View>
            
            <View className="w-full mt-8">
                {categories.map((cat, i) => (
                    <View key={i} className="flex-row items-center justify-between mb-3 px-2">
                        <View className="flex-row items-center">
                            <View style={{ backgroundColor: cat.color }} className="w-3 h-3 rounded-full mr-3" />
                            <Text className="text-secondary font-medium">{cat.name}</Text>
                        </View>
                        <View className="flex-row items-center">
                            <Text className="text-secondary font-bold mr-3">{cat.amount}</Text>
                            <Text className="text-muted text-xs w-8 text-right">{cat.percentage}%</Text>
                        </View>
                    </View>
                ))}
            </View>
          </Card>
        </Animated.View>

        {/* Weekly Spending (Bar Chart Placeholder) */}
        <Animated.View entering={FadeInUp.delay(400).duration(800)}>
            <Text className="text-xl font-bold text-secondary mb-4">Weekly Spending</Text>
            <Card className="p-6 mb-8">
                <View className="flex-row items-end justify-between h-40">
                    {[40, 65, 35, 90, 55, 75, 45].map((val, i) => (
                        <View key={i} className="items-center">
                            <View 
                                style={{ height: `${val}%` }} 
                                className={`w-8 rounded-t-lg ${i === 3 ? 'bg-primary' : 'bg-primary/20'}`} 
                            />
                            <Text className="text-muted text-[10px] mt-2 font-bold">
                                {['M', 'T', 'W', 'T', 'F', 'S', 'S'][i]}
                            </Text>
                        </View>
                    ))}
                </View>
            </Card>
        </Animated.View>

        {/* Summary Cards */}
        <View className="flex-row justify-between mb-8">
            <Card className="w-[48%] p-4">
                <View className="bg-accent/10 w-10 h-10 rounded-xl items-center justify-center mb-3">
                    <Ionicons name="trending-up" size={20} color="#10b981" />
                </View>
                <Text className="text-muted text-xs font-medium">Top Category</Text>
                <Text className="text-secondary font-bold text-lg">Food</Text>
            </Card>
            <Card className="w-[48%] p-4">
                <View className="bg-danger/10 w-10 h-10 rounded-xl items-center justify-center mb-3">
                    <Ionicons name="alert-circle" size={20} color="#f43f5e" />
                </View>
                <Text className="text-muted text-xs font-medium">Highest Spent</Text>
                <Text className="text-secondary font-bold text-lg">Shopping</Text>
            </Card>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
