import {
  TouchableOpacity,
  Image,
  FlatList,
  useWindowDimensions,
  ScrollView,
  StatusBar,
} from 'react-native';
import React, {FC, memo, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList, IRootTabParamList} from '../../navigation/types';
import {CompositeScreenProps, useIsFocused} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Box from '../../themes/Box';
import {
  DownIcon,
  GridIcon,
  MenuIcon,
  PlusIcon,
  ReelsIcon,
  TagIcon,
} from '../../images';
import Text from '../../themes/Text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import Stories from '../../components/Stories';
import PostGrid from '../../components/PostGrid';
import ReelsGrid from '../../components/ReelsGrid';
import TagPostGrid from '../../components/TagPostGrid';
import {p} from '../../themes/light';
import ProfileBottomSheet from './ProfileBottomSheet';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Profile'>,
  NativeStackScreenProps<IRootStackParamList>
>;

export interface IUser {
  userId: string;
  name: string;
  email: string;
  photo: string;
  bio: string | undefined;
  website: string | undefined;
}
const Profile: FC<IProps> = ({navigation}) => {
  const {width} = useWindowDimensions();
  const [profile, setProfile] = useState<IUser>();
  const [activeTab, setActiveTab] = useState<'POST' | 'REELS' | 'TAGS'>('POST');
  const [isCreateOpen, setIsCreateOpen] = useState<-1 | 0 | 1>(-1);

  const isFocus = useIsFocused();

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Box flexDirection="row" py="md" px="md" justifyContent="space-between">
          <Box flexDirection="row">
            <Text fontSize={18} fontWeight="bold" color="black">
              {profile?.email.substring(0, profile.email.indexOf('@'))}
            </Text>
            <Box ml="xs" justifyContent="flex-end">
              <Image
                source={DownIcon}
                style={{width: 20, height: 20, tintColor: '#000'}}
              />
            </Box>
          </Box>
          <Box flexDirection="row" width={'20%'} justifyContent="space-between">
            <TouchableOpacity onPress={() => setIsCreateOpen(0)}>
              <Image
                source={PlusIcon}
                style={{width: 23, height: 23, tintColor: '#000'}}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setIsCreateOpen(1)}>
              <Image
                source={MenuIcon}
                style={{width: 23, height: 23, tintColor: '#000'}}
              />
            </TouchableOpacity>
          </Box>
        </Box>
      ),
    });
    getProfileInfo();
  }, [navigation, isFocus]);

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

  return (
    <Box flex={1}>
      <StatusBar backgroundColor={p.white} />

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
          {/* <Text fontSize={16}>Education</Text> */}
          <Text fontSize={16} color="black" letterSpacing={1}>
            {profile?.bio}
          </Text>
        </Box>
        <Box mt="md">
          <TouchableOpacity
            onPress={() => navigation.push('EditProfile', {profile: profile})}>
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
        </Box>
        <Box mt="xs">
          <FlatList data={[1]} renderItem={() => <Stories />} />
        </Box>
      </Box>
      {/* /** -------> this is normal tab bar code without navigation <-----  */}
      {/* <ProfileTabNavigator /> */}
      <Box
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
      </Box>

      <Box>
        {activeTab === 'POST' ? (
          <PostGrid profile={profile} />
        ) : activeTab === 'REELS' ? (
          <ReelsGrid />
        ) : (
          <TagPostGrid />
        )}
      </Box>

      <ProfileBottomSheet
        isCreateOpen={isCreateOpen}
        setIsCreateOpen={setIsCreateOpen}
      />
    </Box>
  );
};

export default memo(Profile);
