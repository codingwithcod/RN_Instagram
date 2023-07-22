import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {IRootStackParamList, IRootTabParamList} from './types';
import Home from '../screens/home/Home';
import Search from '../screens/search/Search';
import AddPost from '../screens/addpost/AddPost';
import Reels from '../screens/reels/Reels';
import Profile from '../screens/profile/Profile';
import {p} from '../themes/light';
import Box from '../themes/Box';
import {
  CloseIcon,
  HomeFillIcon,
  HomeIcon,
  InstaGramLetterIcon,
  PlusIcon,
  ProfileIcon,
  ReelsIcon,
  SearchIcon,
  SearchThikIcon,
} from '../images';
import {useColorScheme} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Text from '../themes/Text';
import {useNavigation} from '@react-navigation/native';
const Tab = createBottomTabNavigator<IRootTabParamList>();

const BottomTabNavigator = () => {
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [profile, setProfile] = useState<string | null>();
  useEffect(() => {
    const fetchImage = async () => {
      const img = await AsyncStorage.getItem('USER_PHOTO');
      setProfile(img);
    };
    fetchImage();
  }, []);
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
                style={{width: 20, height: 20}}
              />
            </Box>
          ),
          headerShown: true,
          headerTitle: () => (
            <Box>
              <Image
                source={InstaGramLetterIcon}
                style={{
                  width: 120,
                  height: 40,
                  tintColor: colorScheme === 'dark' ? '#fff' : '#000',
                }}
              />
            </Box>
          ),
          headerTitleAlign: 'left',
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#000' : '#fff',
          },
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
                style={{width: 18, height: 18}}
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
              <Image source={PlusIcon} style={{width: 20, height: 20}} />
            </Box>
          ),
          header(props) {
            return (
              <Box p="sm" px="md">
                <Box
                  width={'65%'}
                  flexDirection="row"
                  alignItems="center"
                  justifyContent="space-between">
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                      source={CloseIcon}
                      style={{width: 20, height: 20, tintColor: '#000'}}
                    />
                  </TouchableOpacity>
                  <Text fontSize={25} fontWeight="500" color="black">
                    New Post
                  </Text>
                </Box>
              </Box>
            );
          },
        }}
      />
      <Tab.Screen
        name="Reels"
        component={Reels}
        options={{
          headerShown: false,
          tabBarIcon: ({focused}) => (
            <Box>
              <Image source={ReelsIcon} style={{width: 20, height: 20}} />
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
              {profile ? (
                <Image
                  source={{uri: profile}}
                  style={{width: 22, height: 22, borderRadius: 10}}
                />
              ) : (
                <Image source={ProfileIcon} style={{width: 20, height: 20}} />
              )}
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
