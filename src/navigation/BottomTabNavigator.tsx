import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IRootTabParamList} from './types';
import Home from '../screens/Home';
import Search from '../screens/Search';
import AddPost from '../screens/AddPost';
import Reels from '../screens/Reels';
import Profile from '../screens/Profile';

const Tab = createBottomTabNavigator<IRootTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Search" component={Search} />
      <Tab.Screen name="AddPost" component={AddPost} />
      <Tab.Screen name="Reels" component={Reels} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});
