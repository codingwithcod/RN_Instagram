import React, {FC, useEffect} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList, IRootTabParamList} from '../navigation/types';
import Box from '../themes/Box';
import Text from '../themes/Text';
import {Button} from 'react-native';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'AddPost'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const AddPost: FC<IProps> = ({navigation}) => {
  useEffect(() => {
    navigation.setOptions({
      tabBarStyle: {
        display: 'none',
      },
    });
    return () =>
      navigation.setOptions({
        tabBarStyle: undefined,
      });
  }, [navigation]);
  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text variant="body">This Page Currrently unavailable</Text>
      <Box mt="lg" />
      <Button title="Go back" onPress={() => navigation.goBack()} />
    </Box>
  );
};

export default AddPost;
