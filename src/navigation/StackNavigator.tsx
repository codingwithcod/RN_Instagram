import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {IRootStackParamList} from './types';
import BottomTabNavigator from './BottomTabNavigator';
import Notifications from '../screens/Notifications';

const Stack = createNativeStackNavigator<IRootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Main"
        options={{headerShown: false}}
        children={() => (
          <SafeAreaView style={{flex: 1}}>
            <BottomTabNavigator />
          </SafeAreaView>
        )}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
        options={{headerShown: true}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
