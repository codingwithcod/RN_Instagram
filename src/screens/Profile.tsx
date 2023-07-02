import {TouchableOpacity, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList, IRootTabParamList} from '../navigation/types';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import Box from '../themes/Box';
import {MenuIcon, PlusIcon} from '../images';
import Text from '../themes/Text';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'Profile'>,
  NativeStackScreenProps<IRootStackParamList>
>;
const Profile: FC<IProps> = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <Box
          flexDirection="row"
          py="sm"
          px="md"
          bg="lighGray"
          pb="md"
          justifyContent="space-between">
          <Box>
            <Text fontSize={18} fontWeight="bold">
              ManojSolanki
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
      // headerRight: () => (
      //   <Box
      //     flexDirection="row"
      //     width={'25%'}
      //     justifyContent="space-between"
      //     mr="md">
      //     <TouchableOpacity
      //       onPress={() => navigation.navigate('Notifications')}>
      //       <Image
      //         source={PlusIcon}
      //         style={{width: 23, height: 23, tintColor: '#000'}}
      //       />
      //     </TouchableOpacity>
      //     <TouchableOpacity>
      //       <Image source={MenuIcon} style={{width: 23, height: 23}} />
      //     </TouchableOpacity>
      //   </Box>
      // ),
    });
  }, [navigation]);
  return (
    <Box>
      <Text>Profile</Text>
    </Box>
  );
};

export default Profile;
