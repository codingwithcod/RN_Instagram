import {View, Text, FlatList, Image, RefreshControl} from 'react-native';
import React, {FC, memo, useEffect, useState} from 'react';
import {IPost} from '../home/Home';
import firestore from '@react-native-firebase/firestore';
import Box from '../../themes/Box';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {IRootStackParamList, IRootTabParamList} from '../../navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import SearchHeader from './SearchHeader';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Search'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const Search: FC<IProps> = ({navigation}) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
    getAllPost();
  }, []);

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

  const handleRefresh = async () => {
    setRefreshing(true);
    await getAllPost();
    setRefreshing(false);
  };

  return (
    <Box alignItems="center" pt="sm">
      <FlatList
        data={posts}
        numColumns={3}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        ListHeaderComponent={() => <SearchHeader />}
        renderItem={({item}) => (
          <Box width={'33%'} height={120} bg="xLighGray" style={{margin: 1}}>
            <Image
              source={{uri: item.image}}
              style={{width: '100%', height: '100%'}}
            />
          </Box>
        )}
      />
    </Box>
  );
};

export default memo(Search);
