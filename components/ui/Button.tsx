import React from 'react';
import { TouchableOpacity, Text, ActivityIndicator, View } from 'react-native';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'danger';
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  loading = false,
  disabled = false,
  className = '',
  icon,
}) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.96);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const getVariantStyles = () => {
    switch (variant) {
      case 'secondary':
        return 'bg-secondary';
      case 'outline':
        return 'bg-transparent border border-primary';
      case 'danger':
        return 'bg-danger';
      default:
        return 'bg-primary';
    }
  };

  const getTextStyles = () => {
    switch (variant) {
      case 'outline':
        return 'text-primary font-semibold';
      default:
        return 'text-white font-semibold';
    }
  };

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      disabled={disabled || loading}
      style={animatedStyle}
      className={`h-14 rounded-2xl flex-row items-center justify-center px-6 ${getVariantStyles()} ${className} ${
        disabled ? 'opacity-50' : ''
      }`}
    >
      {loading ? (
        <ActivityIndicator color={variant === 'outline' ? '#6366f1' : 'white'} />
      ) : (
        <View className="flex-row items-center">
          {icon && <View className="mr-2">{icon}</View>}
          <Text className={`text-lg ${getTextStyles()}`}>{title}</Text>
        </View>
      )}
    </AnimatedTouchableOpacity>
  );
};
