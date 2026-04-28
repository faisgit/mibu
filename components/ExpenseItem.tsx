import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CategoryIcon from './CategoryIcon';
import { Expense } from '@/services/firebase/db';

interface ExpenseItemProps {
  expense: Expense;
  onPress?: () => void;
}

export default function ExpenseItem({ expense, onPress }: ExpenseItemProps) {
  const date = expense.date ? new Date(expense.date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }) : '';

  return (
    <TouchableOpacity 
      onPress={onPress}
      activeOpacity={0.7}
      className="flex-row items-center bg-white p-5 rounded-[28px] mb-4 shadow-sm shadow-slate-200 border border-slate-50"
    >
      <View className="relative">
        <CategoryIcon category={expense.category} size={22} />
      </View>
      
      <View className="flex-1 ml-4">
        <Text className="text-slate-900 font-bold text-lg leading-tight">{expense.category}</Text>
        <View className="flex-row items-center mt-1">
          <Text className="text-slate-400 text-xs font-medium uppercase tracking-wider">{date}</Text>
          {expense.note && (
            <>
              <View className="w-1 h-1 bg-slate-300 rounded-full mx-2" />
              <Text className="text-slate-500 text-xs flex-1" numberOfLines={1}>
                {expense.note}
              </Text>
            </>
          )}
        </View>
      </View>
      
      <View className="items-end">
        <Text className="text-slate-900 font-extrabold text-lg">
          - ₹{expense.amount.toLocaleString('en-IN')}
        </Text>
        <View className="px-2 py-0.5 bg-danger/10 rounded-full mt-1">
          <Text className="text-danger text-[10px] font-bold uppercase">Debit</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

