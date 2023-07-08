import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import PostGrid from '../components/PostGrid';
import ReelsGrid from '../components/ReelsGrid';
import TagPostGrid from '../components/TagPostGrid';
import {GridIcon, ReelsIcon, TagIcon} from '../images';
import Box from '../themes/Box';
import {p} from '../themes/light';

const TopTab = createMaterialTopTabNavigator();

const ProfileTabNavigator = () => {
  return (
    <TopTab.Navigator
      initialRouteName="Post"
      backBehavior="history"
      screenOptions={({route}) => ({
        tabBarShowLabel: false,
        tabBarContentContainerStyle: {backgroundColor: p.white},
        tabBarIndicatorStyle: {
          backgroundColor: 'black',
          height: 1.5,
        },
        tabBarIcon: ({focused}) => {
          if (route.name === 'Post') {
            return (
              <Image
                source={GridIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#000' : '#888',
                }}
              />
            );
          } else if (route.name === 'Reels') {
            return (
              <Image
                source={ReelsIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: focused ? '#000' : '#888',
                }}
              />
            );
          } else if (route.name === 'Tags') {
            return (
              <Image
                source={TagIcon}
                style={{
                  width: 32,
                  height: 32,
                  paddingBottom: 15,
                  tintColor: focused ? '#000' : '#888',
                  // backgroundColor: 'red',
                }}
              />
            );
          }
        },
      })}>
      <TopTab.Screen name="Post" component={PostGrid} />
      <TopTab.Screen name="Reels" component={ReelsGrid} />
      <TopTab.Screen name="Tags" component={TagPostGrid} />
    </TopTab.Navigator>
  );
};

export default ProfileTabNavigator;

const styles = StyleSheet.create({});
