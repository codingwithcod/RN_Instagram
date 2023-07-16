import {
  FlatList,
  RefreshControl,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import React, {FC, useCallback, useEffect, useState} from 'react';
import Box from '../../themes/Box';

import {useSharedValue, withDelay, withSpring} from 'react-native-reanimated';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {IRootStackParamList, IRootTabParamList} from '../../navigation/types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import firestore from '@react-native-firebase/firestore';
import Reel from './Reel';

export interface IReel {
  reelId: string;
  userId: string;
  userName: string;
  userPhoto: string;
  caption: string;
  video: string;
  likes: string[];
  createdAt: string;
}

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Reels'>,
  NativeStackScreenProps<IRootStackParamList>
>;
const Reels: FC<IProps> = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [reels, setReels] = useState<IReel[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getAllReels();
  }, []);

  /** fetching reels data  */
  const getAllReels = useCallback(async () => {
    console.log('----------- i am  getAll reels --->');
    firestore()
      .collection('reels')
      .orderBy('createdAt', 'desc')
      .get()
      .then(res => {
        const postData = res.docs.map(doc => {
          return doc.data() as IReel;
        });
        setReels(postData);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const {height} = useWindowDimensions();
  const scale = useSharedValue(0);
  const doubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(300, withSpring(0));
      }
    });
  }, []);

  const handleRefresh = async () => {
    setRefreshing(true);
    await getAllReels();
    setRefreshing(false);
  };

  return (
    <Box height={height - 40} style={{backgroundColor: 'black'}}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} />
        }
        onScroll={e =>
          setSelectedIndex(Math.ceil(e.nativeEvent.contentOffset.y / height))
        }
        data={reels}
        renderItem={({item, index}) => (
          <Reel item={item} index={index} selectedIndex={selectedIndex} />
        )}
      />
    </Box>
  );
};

export default Reels;
