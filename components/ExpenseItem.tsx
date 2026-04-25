import React from 'react';
import { View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Card } from './ui/Card';

interface ExpenseItemProps {
  category: string;
  amount: string;
  date: string;
  note?: string;
  type?: 'expense' | 'income';
}

const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'food':
      return { name: 'fast-food', color: '#f97316', bg: '#fff7ed' };
    case 'travel':
      return { name: 'airplane', color: '#06b6d4', bg: '#ecfeff' };
    case 'shopping':
      return { name: 'cart', color: '#8b5cf6', bg: '#f5f3ff' };
    case 'entertainment':
      return { name: 'game-controller', color: '#ec4899', bg: '#fdf2f8' };
    case 'health':
      return { name: 'medical', color: '#ef4444', bg: '#fef2f2' };
    default:
      return { name: 'cash', color: '#6366f1', bg: '#eef2ff' };
  }
};

export const ExpenseItem: React.FC<ExpenseItemProps> = ({
  category,
  amount,
  date,
  note,
  type = 'expense',
}) => {
  const icon = getCategoryIcon(category);

  return (
    <Card className="flex-row items-center p-4 mb-3 border border-slate-100 shadow-none">
      <View
        style={{ backgroundColor: icon.bg }}
        className="w-12 h-12 rounded-2xl items-center justify-center mr-4"
      >
        <Ionicons name={icon.name as any} size={24} color={icon.color} />
      </View>
      <View className="flex-1">
        <Text className="text-secondary font-bold text-base capitalize">{category}</Text>
        <Text className="text-muted text-xs mt-0.5">{date}</Text>
        {note && (
          <Text className="text-muted text-xs mt-1 italic" numberOfLines={1}>
            {note}
          </Text>
        )}
      </View>
      <View>
        <Text
          className={`text-lg font-bold ${
            type === 'expense' ? 'text-danger' : 'text-accent'
          }`}
        >
          {type === 'expense' ? '-' : '+'}₹{amount}
        </Text>
      </View>
    </Card>
  );
};
