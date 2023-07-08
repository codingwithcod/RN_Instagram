import React, {FC, useEffect, useState} from 'react';
import {CompositeScreenProps} from '@react-navigation/native';
import {BottomTabScreenProps} from '@react-navigation/bottom-tabs';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList, IRootTabParamList} from '../../navigation/types';
import Box from '../../themes/Box';
import Text from '../../themes/Text';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CameraIcon} from '../../images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {p} from '../../themes/light';
import BottomModal from './BottomModal';
import Loader from '../../components/Loader';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'AddPost'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const AddPost: FC<IProps> = ({navigation}) => {
  const [profile, setProfile] = useState<string | null>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  useEffect(() => {
    const fetchImage = async () => {
      const img = await AsyncStorage.getItem('USER_PHOTO');
      setProfile(img);
    };
    fetchImage();
  }, []);

  const handleSharePost = () => {
    setIsLoading(true);
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Box flex={1} p="md" alignItems="center">
        <Box height={300} width={'100%'} borderWidth={1}>
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <Box
              width={'100%'}
              height={'100%'}
              justifyContent="center"
              alignItems="center"
              style={{backgroundColor: 'rgba(0,0,0,0.2)'}}>
              <Image source={CameraIcon} style={{width: 50, height: 50}} />
              <Text fontSize={20} mt="sm">
                Tap to upload an image
              </Text>
            </Box>
          </TouchableOpacity>
        </Box>
        <Box mt="lg" />
        <KeyboardAvoidingView style={{width: '100%'}}>
          <Box
            width={'100%'}
            flexDirection="row"
            py="sm"
            borderBottomWidth={0.51}
            borderColor="black">
            <Box
              width={50}
              height={50}
              borderWidth={1}
              borderRadius={25}
              justifyContent="center"
              alignItems="center"
              mr="md">
              {profile && (
                <Image
                  source={{uri: profile}}
                  style={{height: 40, width: 40, borderRadius: 20}}
                />
              )}
            </Box>
            <TextInput
              placeholder="Write a caption..."
              style={{fontSize: 18, color: p.lighGray}}
            />
          </Box>
        </KeyboardAvoidingView>
        <Box my="md" />
        <TouchableOpacity onPress={handleSharePost} style={{width: '100%'}}>
          <Box
            width={'100%'}
            height={50}
            borderRadius={10}
            borderWidth={0.5}
            borderColor="blue2"
            justifyContent="center"
            alignItems="center">
            <Text fontSize={20} fontWeight="500" color="blue2">
              Share Post
            </Text>
          </Box>
        </TouchableOpacity>

        <BottomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
        <Loader isLoading={isLoading} title="Post Sharing ..." />
      </Box>
    </ScrollView>
  );
};

export default AddPost;
