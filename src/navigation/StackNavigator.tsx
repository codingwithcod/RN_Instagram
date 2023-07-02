import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/Home';
import {IRootStackParamList} from './types';
import BottomTabNavigator from './BottomTabNavigator';
import Notifications from '../screens/Notifications';
import Splash from '../screens/Splash';
import ShowStory from '../screens/ShowStory';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator<IRootStackParamList>();

const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
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
      <Stack.Screen
        name="ShowStory"
        component={ShowStory}
        options={{headerShown: false, animation: 'fade'}}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
