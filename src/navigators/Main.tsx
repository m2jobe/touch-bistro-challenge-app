import React from 'react';
import Home from '../screens/Home';
import { createStackNavigator } from '@react-navigation/stack';
import Discounts from '@/screens/Discounts';

const Stack = createStackNavigator();

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Discounts" component={Discounts} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
