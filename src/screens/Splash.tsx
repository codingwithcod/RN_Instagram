import React, {FC, useEffect} from 'react';
import Box from '../themes/Box';
import {Image, StatusBar} from 'react-native';
import {InstagramLogoIcon, MetaIcon} from '../imges';
import Text from '../themes/Text';
import {p} from '../themes/light';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../navigation/types';

type IProps = NativeStackScreenProps<IRootStackParamList, 'Splash'>;

const Splash: FC<IProps> = ({navigation}) => {
  useEffect(() => {}, []);
  setTimeout(() => {
    navigation.replace('Main');
  }, 1000);
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <StatusBar backgroundColor={p.white} barStyle="dark-content" />
      <Box>
        <Image source={InstagramLogoIcon} style={{width: 90, height: 90}} />
      </Box>
      <Box position="absolute" bottom={20}>
        <Text textAlign="center" fontSize={18}>
          from
        </Text>
        <Box flexDirection="row" alignItems="center">
          <Image source={MetaIcon} style={{width: 100, height: 40}} />
        </Box>
      </Box>
    </Box>
  );
};

export default Splash;
