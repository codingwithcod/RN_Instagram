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
import ConfirmGalleryModal from '../../components/ConfirmGalleryModal';
import Loader from '../../components/Loader';
import {ImagePickerResponse} from 'react-native-image-picker';
import uploadFile from '../../utils/uploadFile';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

type IProps = CompositeScreenProps<
  BottomTabScreenProps<IRootTabParamList, 'AddPost'>,
  NativeStackScreenProps<IRootStackParamList>
>;

const AddPost: FC<IProps> = ({navigation}) => {
  const [profile, setProfile] = useState<string | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [imageData, setImageData] = useState<ImagePickerResponse>({});
  const [caption, setCaption] = useState<string>('');

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

  const handleSharePost = async () => {
    if (!imageData.assets) {
      console.log(' ---!> Please select Image ');
    } else if (caption === '') {
      console.log(' ---!> Please write something on caption ');
    } else {
      setIsLoading(true);
      const userName = await AsyncStorage.getItem('USER_NAME');
      const userId = await AsyncStorage.getItem('USERID');
      const userPhoto = await AsyncStorage.getItem('USER_PHOTO');

      if (imageData.assets[0]?.fileName && imageData.assets[0]?.uri) {
        const imageUrl = await uploadFile(
          imageData.assets[0]?.fileName,
          imageData.assets[0]?.uri,
        );
        const postId = uuid.v4().toString();
        firestore()
          .collection('posts')
          .doc(postId)
          .set({
            postId,
            userId,
            userName,
            userPhoto,
            caption,
            image: imageUrl,
            likes: [],
            createdAt: Date.now(),
          })
          .then(res => {
            setIsLoading(false);
            setImageData({});
            setCaption('');
            navigation.goBack();
          })
          .catch(error => {
            setIsLoading(false);
            console.log(error);
          });
      }
    }
  };

  return (
    <ScrollView style={{flex: 1}}>
      <Box flex={1} p="sm" alignItems="center">
        <Box height={300} width={'100%'} borderWidth={0.5} borderRadius={10}>
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            {imageData.assets ? (
              <Box width={'100%'} height={'100%'}>
                <Image
                  source={{uri: imageData.assets[0].uri}}
                  style={{width: '100%', height: '100%'}}
                />
              </Box>
            ) : (
              <Box
                width={'100%'}
                height={'100%'}
                justifyContent="center"
                alignItems="center"
                style={{backgroundColor: 'rgba(0,0,255,0.051)'}}>
                <Image source={CameraIcon} style={{width: 50, height: 50}} />
                <Text fontSize={20} mt="sm">
                  Tap to upload an image
                </Text>
              </Box>
            )}
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
              width={40}
              height={40}
              borderWidth={1}
              borderRadius={20}
              borderColor="lighGray"
              justifyContent="center"
              alignItems="center"
              mr="md">
              {profile && (
                <Image
                  source={{uri: profile}}
                  style={{height: 35, width: 35, borderRadius: 20}}
                />
              )}
            </Box>
            <TextInput
              placeholder="Write a caption..."
              style={{fontSize: 18, color: p.lighGray}}
              value={caption}
              onChangeText={txt => setCaption(txt)}
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

        <ConfirmGalleryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setImageData={setImageData}
        />
        <Loader isLoading={isLoading} title="Post Sharing ..." />
      </Box>
    </ScrollView>
  );
};

export default AddPost;
