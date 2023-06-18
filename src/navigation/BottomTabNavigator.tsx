import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IRootTabParamList} from './types';
import Home from '../screens/Home';
import Search from '../screens/Search';
import AddPost from '../screens/AddPost';
import Reels from '../screens/Reels';
import Profile from '../screens/Profile';
import {p} from '../themes/light';
import Box from '../themes/Box';
import {
  HomeFillIcon,
  HomeIcon,
  InstaGramLetterIcon,
  LikeFillIcon,
  LikeIcon,
  PlusIcon,
  ProfileIcon,
  ReelsIcon,
  SearchIcon,
  SearchThikIcon,
  ShareIcon,
} from '../imges';
import InstaGramLetterLogo from '../svg/Instagram-letter-logo.svg';

const Tab = createBottomTabNavigator<IRootTabParamList>();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: p.white,
          elevation: 15,
          height: 50,
          paddingBottom: 5,
          paddingTop: 5,
          minHeight: 55,
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <Box>
              <Image
                source={focused ? HomeFillIcon : HomeIcon}
                style={{width: 30, height: 30}}
              />
            </Box>
          ),
          headerShown: true,
          headerTitle: () => (
            <Box>
              <Image
                source={InstaGramLetterIcon}
                style={{width: 120, height: 40}}
              />
            </Box>
          ),
          headerTitleAlign: 'left',
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({focused}) => (
            <Box>
              <Image
                source={focused ? SearchThikIcon : SearchIcon}
                style={{width: 25, height: 25}}
              />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="AddPost"
        component={AddPost}
        options={{
          tabBarIcon: ({focused}) => (
            <Box>
              <Image source={PlusIcon} style={{width: 30, height: 30}} />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          tabBarIcon: ({focused}) => (
            <Box>
              <Image source={ReelsIcon} style={{width: 30, height: 30}} />
            </Box>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.profile}>
              <Image source={ProfileIcon} style={{width: 30, height: 30}} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({
  profile: {
    borderWidth: 1.5,
    borderRadius: 50,
    borderColor: 'black',
  },
});
