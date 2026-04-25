import React, { useState } from 'react';
import { View, TextInput, Text, TextInputProps } from 'react-native';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  className?: string;
  icon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  className = '',
  icon,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View className={`mb-4 w-full ${className}`}>
      {label && (
        <Text className="text-secondary font-medium mb-1.5 ml-1">{label}</Text>
      )}
      <View
        className={`flex-row items-center h-14 bg-white rounded-2xl px-4 border ${
          isFocused ? 'border-primary' : error ? 'border-danger' : 'border-slate-200'
        } shadow-sm`}
      >
        {icon && <View className="mr-3">{icon}</View>}
        <TextInput
          className="flex-1 text-secondary text-base"
          placeholderTextColor="#94a3b8"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />
      </View>
      {error && (
        <Text className="text-danger text-sm mt-1 ml-1">{error}</Text>
      )}
    </View>
  );
};
