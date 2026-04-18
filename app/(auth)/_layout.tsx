import { Stack } from 'expo-router';
import React from 'react'

const Authlayout = () => {
  return (
    <Stack screenOptions={{headerShown: false}} >
        <Stack.Screen name="login" />
    </Stack>
  )
}

export default Authlayout