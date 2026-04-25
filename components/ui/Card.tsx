import React from 'react';
import { View, ViewProps } from 'react-native';

interface CardProps extends ViewProps {
  className?: string;
  children: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({ children, className = '', ...props }) => {
  return (
    <View
      className={`bg-white rounded-3xl p-5 shadow-sm shadow-slate-200 ${className}`}
      {...props}
    >
      {children}
    </View>
  );
};
