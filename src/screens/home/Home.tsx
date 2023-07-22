import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect, useState} from 'react';
import {Image, RefreshControl} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import SingleStory from '../../components/SingleStory';
import Stories from '../../components/Stories';
import {LikeIcon, MessengerIcon} from '../../images';
import {IRootStackParamList, IRootTabParamList} from '../../navigation/types';
import Box from '../../themes/Box';
import Post from './Post';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Home'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const singleStoryItem = {
  username: 'ninjan',
  img: 'https://lh3.googleusercontent.com/ogw/AOLn63HW_267NF3b_1GW49FKH6xzWHUdxQynjA99jwl8=s64-c-mo',
  isSeen: false,
};
export interface IPost {
  postId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  caption: string;
  image: string;
  likes: string[];
  createdAt: string;
}

const Home: FC<IProps> = ({navigation}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [userId, setUserId] = useState<string>();
  const [refresing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box
          flexDirection="row"
          width={'30%'}
          justifyContent="space-between"
          mr="md">
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Image
              source={LikeIcon}
              style={{width: 23, height: 23, tintColor: '#000'}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={MessengerIcon} style={{width: 23, height: 23}} />
          </TouchableOpacity>
        </Box>
      ),
    });
    getAllPost();
    getUserId();
  }, [navigation]);

  const getUserId = async () => {
    const userId = await AsyncStorage.getItem('USERID');
    if (userId) {
      setUserId(userId);
    }
  };

  const getAllPost = async () => {
    console.log('----------- i am  getAll post --->');
    firestore()
      .collection('posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then(res => {
        const postData = res.docs.map(doc => {
          return doc.data() as IPost;
        });
        setPosts(postData);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const hadleRefresh = async () => {
    console.log('----------- i am  handle Refresh --->');
    setRefreshing(true);
    await getAllPost();
    setRefreshing(false);
  };

  return (
    <Box flex={1} bg="white">
      {/* <Stories /> */}
      <FlatList
        data={posts}
        keyExtractor={item => item.postId}
        refreshControl={
          <RefreshControl refreshing={refresing} onRefresh={hadleRefresh} />
        }
        ListHeaderComponent={() => <Stories />}
        renderItem={({item}) => (
          <>
            <Post item={item} userId={userId} />
          </>
        )}
      />
    </Box>
  );
};

export default Home;
