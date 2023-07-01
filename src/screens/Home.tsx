import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native';
import SingleStory from '../components/SingleStory';
import Stories from '../components/Stories';
import {
  CommentIcon,
  LikeIcon,
  SaveIcon,
  MessengerIcon,
  ShareIcon,
  ThreeDotsIcon,
} from '../images';
import {IRootStackParamList, IRootTabParamList} from '../navigation/types';
import Box from '../themes/Box';
import Text from '../themes/Text';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Home'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const singleStoryItem = {
  username: 'ninjan',
  img: 'https://lh3.googleusercontent.com/ogw/AOLn63HW_267NF3b_1GW49FKH6xzWHUdxQynjA99jwl8=s64-c-mo',
  isSeen: false,
};

const Home: FC<IProps> = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Box
          flexDirection="row"
          width={'35%'}
          justifyContent="space-between"
          mr="md">
          <TouchableOpacity
            onPress={() => navigation.navigate('Notifications')}>
            <Image
              source={LikeIcon}
              style={{width: 25, height: 25, tintColor: '#000'}}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={MessengerIcon} style={{width: 25, height: 25}} />
          </TouchableOpacity>
        </Box>
      ),
    });
  }, [navigation]);
  return (
    <Box flex={1} bg="white">
      {/* <Stories /> */}
      <FlatList
        data={[1, 2, 3, 4, 5, 6]}
        ListHeaderComponent={() => <Stories />}
        renderItem={() => (
          <Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              px="xs"
              pr="sm">
              <Box flexDirection="row" alignItems="center">
                <Box>
                  <SingleStory item={singleStoryItem} />
                </Box>
                <Box>
                  <Text>sureshkumar_09</Text>
                  <Text>RAnthamore Ganesh Temple</Text>
                </Box>
              </Box>
              <Box>
                <Image source={ThreeDotsIcon} style={{width: 20, height: 20}} />
              </Box>
            </Box>
            <Box>
              <Image
                source={{
                  uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
                }}
                style={{width: '100%', height: 320}}
              />
            </Box>
            <Box
              flexDirection="row"
              alignItems="center"
              justifyContent="space-between"
              m="sm"
              mx="md">
              <Box flexDirection="row">
                <Image source={LikeIcon} style={{width: 20, height: 20}} />
                <Box mx="sm" />
                <Image source={CommentIcon} style={{width: 20, height: 20}} />
                <Box mx="sm" />
                <Image source={ShareIcon} style={{width: 20, height: 20}} />
              </Box>
              <Box>
                <Image source={SaveIcon} style={{width: 20, height: 20}} />
              </Box>
            </Box>
            <Box m="sm" mx="md">
              <Text fontSize={20} fontWeight="bold">
                14 Likes
              </Text>
              <Text fontSize={16}>sureshkumar_09 Alone Safer</Text>
              <Text fontSize={16}>5 hours ago .</Text>
            </Box>
          </Box>
        )}
      />
    </Box>
  );
};

export default Home;
