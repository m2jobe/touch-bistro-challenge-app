import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  NavigationContainer,
  useNavigationContainerRef,
} from '@react-navigation/native';
import Startup from '../screens/Startup';
import MainNavigator from './Main';
import { useFlipper } from '@react-navigation/devtools';
import { ApplicationStackParamList } from '../../@types/navigation';

const Stack = createStackNavigator<ApplicationStackParamList>();

const styles = StyleSheet.create({
  safeAreaViewContainer: {
    height: '100%',
  },
});

const ApplicationNavigator = () => {
  const navigationRef = useNavigationContainerRef();

  useFlipper(navigationRef);

  return (
    <SafeAreaView style={styles.safeAreaViewContainer}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Startup" component={Startup} />
          <Stack.Screen name="Main" component={MainNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
};

export default ApplicationNavigator;
