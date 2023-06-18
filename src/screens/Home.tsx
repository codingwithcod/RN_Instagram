import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {CompositeScreenProps} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, useEffect} from 'react';
import {Image} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {LikeFillIcon, LikeIcon, ShareIcon} from '../imges';
import {IRootStackParamList, IRootTabParamList} from '../navigation/types';
import Box from '../themes/Box';
import Text from '../themes/Text';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Home'>,
  NativeStackScreenProps<IRootStackParamList>
>;

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
            <Image source={LikeIcon} style={{width: 30, height: 30}} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={ShareIcon} style={{width: 30, height: 30}} />
          </TouchableOpacity>
        </Box>
      ),
    });
  }, [navigation]);
  return (
    <Box flex={1} bg="white">
      <Text variant="body">Jai Shree Ram</Text>
      <Image
        source={LikeFillIcon}
        style={{width: 50, height: 50, tintColor: 'red'}}
      />
    </Box>
  );
};

export default Home;
