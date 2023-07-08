import {
  TouchableOpacity,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList, IRootTabParamList} from '../navigation/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Box from '../themes/Box';
import {GridIcon, MenuIcon, PlusIcon, ReelsIcon, TagIcon} from '../images';
import Text from '../themes/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import SingleStory from '../components/SingleStory';
import Stories from '../components/Stories';
import PostGrid from '../components/PostGrid';
import ReelsGrid from '../components/ReelsGrid';
import TagPostGrid from '../components/TagPostGrid';
import ProfileTabNavigator from '../navigation/ProfileTabNavigator';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Profile'>,
  NativeStackScreenProps<IRootStackParamList>
>;

interface IUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | undefined;
  familyName: string | null;
  givenName: string | null;
}
const Profile: FC<IProps> = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [profile, setProfile] = useState<IUser>();
  const [activeTab, setActiveTab] = useState<'POST' | 'REELS' | 'TAGS'>('POST');

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Box flexDirection="row" py="md" px="md" justifyContent="space-between">
          <Box>
            <Text fontSize={18} fontWeight="bold">
              manojSolanki
            </Text>
          </Box>
          <Box flexDirection="row" width={'20%'} justifyContent="space-between">
            <TouchableOpacity
              onPress={() => navigation.navigate('Notifications')}>
              <Image
                source={PlusIcon}
                style={{width: 23, height: 23, tintColor: '#000'}}
              />
            </TouchableOpacity>
            <TouchableOpacity>
              <Image source={MenuIcon} style={{width: 23, height: 23}} />
            </TouchableOpacity>
          </Box>
        </Box>
      ),
    });
    getProfileInfo();
  }, [navigation]);

  const getProfileInfo = async () => {
    const email = await AsyncStorage.getItem('USER_EMAIL');
    firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        // console.log(res.docs[0].data());
        setProfile(res.docs[0].data() as IUser);
      });
  };

  const singOut = async () => {
    GoogleSignin.signOut()
      .then(res => {
        console.log('---- singOut res ------>', res);
        navigation.navigate('Login');
      })
      .catch(err => {
        console.log('---- singOut err ------>', err);
      });
  };

  return (
    <Box>
      <Box mx="md">
        <Box
          width={'100%'}
          flexDirection="row"
          px="xs"
          alignItems="center"
          justifyContent="space-between">
          <Box
            width={65}
            height={65}
            borderRadius={33}
            borderWidth={1}
            borderColor="lighGray"
            justifyContent="center"
            alignItems="center">
            {profile?.photo && (
              <Image
                source={{uri: profile?.photo}}
                style={{width: 60, height: 60, borderRadius: 30}}
              />
            )}
          </Box>
          <Box flexDirection="row">
            <Box justifyContent="center" alignItems="center">
              <Text fontSize={20} color="black">
                102
              </Text>
              <Text fontSize={16} color="black">
                Posts
              </Text>
            </Box>
            <Box mx="md" />

            <Box justifyContent="center" alignItems="center">
              <Text fontSize={20} color="black">
                978
              </Text>
              <Text fontSize={16} color="black">
                Followers
              </Text>
            </Box>
            <Box mx="md" />

            <Box justifyContent="center" alignItems="center">
              <Text fontSize={20} color="black">
                102
              </Text>
              <Text fontSize={16} color="black">
                Following
              </Text>
            </Box>
          </Box>
        </Box>
        <Box mt="sm">
          <Text fontSize={16} fontWeight="500" color="black">
            {profile?.name}
          </Text>
          <Text fontSize={16}>Education</Text>
          <Text fontSize={16} color="black" letterSpacing={1}>
            Programming Needs Patiesnts..🤝
          </Text>
        </Box>
        <Box mt="md">
          <TouchableOpacity onPress={() => navigation.push('EditProfile')}>
            <Box
              bg="xLighGray"
              justifyContent="center"
              alignItems="center"
              p="xs"
              borderRadius={5}>
              <Text fontSize={16} color="black">
                Edit Profile
              </Text>
            </Box>
          </TouchableOpacity>
          <Box my="sm" />
          <TouchableOpacity onPress={() => singOut()}>
            <Box
              bg="xLighGray"
              justifyContent="center"
              alignItems="center"
              p="xs"
              borderRadius={5}>
              <Text fontSize={16} color="black">
                Logout
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box mt="xs">
          <FlatList data={[1]} renderItem={() => <Stories />} />
        </Box>
      </Box>

      {/* <Box
          mt="sm"
          flexDirection="row"
          justifyContent="space-evenly"
          borderBottomWidth={0.5}
          borderColor="xLighGray"
          alignItems="center">
          <TouchableOpacity onPress={() => setActiveTab('POST')}>
            <Box
              borderColor="black"
              borderBottomWidth={activeTab === 'POST' ? 1 : 0}
              width={width / 3}
              height={30}
              justifyContent="center"
              alignItems="center"
              pb="sm">
              <Image
                source={GridIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: activeTab === 'POST' ? '#000' : '#888',
                }}
              />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('REELS')}>
            <Box
              borderColor="black"
              borderBottomWidth={activeTab === 'REELS' ? 1 : 0}
              width={width / 3}
              height={30}
              justifyContent="center"
              alignItems="center"
              pb="sm">
              <Image
                source={ReelsIcon}
                style={{
                  width: 25,
                  height: 25,
                  tintColor: activeTab === 'REELS' ? '#000' : '#888',
                }}
              />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setActiveTab('TAGS')}>
            <Box
              borderColor="black"
              borderBottomWidth={activeTab === 'TAGS' ? 1 : 0}
              width={width / 3}
              height={30}
              justifyContent="center"
              alignItems="center"
              pb="sm">
              <Image
                source={TagIcon}
                style={{
                  width: 33,
                  height: 33,
                  tintColor: activeTab === 'TAGS' ? '#000' : '#888',
                }}
              />
            </Box>
          </TouchableOpacity>
        </Box> */}

      {/* <Box>
          {activeTab === 'POST' ? (
            <PostGrid />
          ) : activeTab === 'REELS' ? (
            <ReelsGrid />
          ) : (
            <TagPostGrid />
          )}
        </Box> */}
      <ProfileTabNavigator />
    </Box>
  );
};

export default Profile;
