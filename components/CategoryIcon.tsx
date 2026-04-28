import React from 'react';
import { View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export const CATEGORIES = {
  Food: { icon: 'fast-food', color: '#f87171', bgColor: '#fef2f2' },
  Shopping: { icon: 'cart', color: '#60a5fa', bgColor: '#eff6ff' },
  Transport: { icon: 'car', color: '#fbbf24', bgColor: '#fffbeb' },
  Health: { icon: 'medkit', color: '#34d399', bgColor: '#ecfdf5' },
  Entertainment: { icon: 'film', color: '#a78bfa', bgColor: '#f5f3ff' },
  Bills: { icon: 'receipt', color: '#f472b6', bgColor: '#fdf2f8' },
  Other: { icon: 'ellipsis-horizontal', color: '#94a3b8', bgColor: '#f8fafc' },
};

export default function CategoryIcon({ category, size = 24 }: { category: string, size?: number }) {
  const config = CATEGORIES[category as keyof typeof CATEGORIES] || CATEGORIES.Other;
  
  return (
    <View 
      className="items-center justify-center rounded-2xl" 
      style={{ 
        width: size * 2, 
        height: size * 2, 
        backgroundColor: config.bgColor 
      }}
    >
      <Ionicons name={config.icon as any} size={size} color={config.color} />
    </View>
  );
}
