import React, {FC, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList, IRootTabParamList} from '../../navigation/types';
import Box from '../../themes/Box';
import Text from '../../themes/Text';
import {
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {CameraIcon} from '../../images';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {p} from '../../themes/light';
import BottomModal from './BottomModal';
import Loader from '../../components/Loader';
import {ImagePickerResponse} from 'react-native-image-picker';
import uploadFile from '../../utils/uploadFile';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import Video from 'react-native-video';

type IProps = NativeStackScreenProps<IRootStackParamList, 'AddReels'>;

const AddReels: FC<IProps> = ({navigation}) => {
  const [profile, setProfile] = useState<string | null>();
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [videoData, setVideoData] = useState<ImagePickerResponse>({});
  const [caption, setCaption] = useState<string>('');

  useEffect(() => {
    navigation.setOptions({
      headerShown: false,
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
    if (!videoData.assets) {
      console.log(' ---!> Please select Image ');
    } else if (caption === '') {
      console.log(' ---!> Please write something on caption ');
    } else {
      setIsLoading(true);
      const userName = await AsyncStorage.getItem('USER_NAME');
      const userId = await AsyncStorage.getItem('USERID');
      const userPhoto = await AsyncStorage.getItem('USER_PHOTO');

      if (videoData.assets[0]?.fileName && videoData.assets[0]?.uri) {
        const videoUrl = await uploadFile(
          videoData.assets[0]?.fileName,
          videoData.assets[0]?.uri,
        );
        const reelId = uuid.v4().toString();
        firestore()
          .collection('reels')
          .doc(reelId)
          .set({
            reelId,
            userId,
            userName,
            userPhoto,
            caption,
            video: videoUrl,
            likes: [],
            createdAt: Date.now(),
          })
          .then(res => {
            setIsLoading(false);
            setVideoData({});
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
    <ScrollView style={{flex: 1, backgroundColor: '#000'}}>
      <StatusBar backgroundColor={'#000'} barStyle={'light-content'} />
      <Box flex={1} alignItems="center" bg="black">
        <Box height={600} width={'100%'} borderWidth={0.5} borderRadius={15}>
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            {videoData.assets ? (
              <Box width={'100%'} height={'100%'}>
                <Video
                  source={{uri: videoData.assets[0].uri}}
                  resizeMode="cover"
                  style={{width: '100%', height: '100%', borderRadius: 15}}
                />
              </Box>
            ) : (
              <Box
                width={'100%'}
                height={'100%'}
                justifyContent="center"
                alignItems="center"
                // style={{backgroundColor: 'rgba(0,0,0,0.0)'}}
              >
                <Image
                  source={CameraIcon}
                  style={{width: 50, height: 50, tintColor: '#fff'}}
                />
                <Text fontSize={20} mt="sm" color="white">
                  Tap to upload a reel
                </Text>
              </Box>
            )}
          </TouchableOpacity>
        </Box>
        <Box mt="lg" />
        <KeyboardAvoidingView style={{width: '100%'}}>
          <Box
            flexDirection="row"
            py="sm"
            mx="md"
            borderBottomWidth={0.51}
            borderColor="white">
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
              placeholderTextColor={'#fff'}
              style={{fontSize: 18, color: p.lighGray}}
              value={caption}
              onChangeText={txt => setCaption(txt)}
            />
          </Box>
        </KeyboardAvoidingView>
        <Box my="md" />
        <TouchableOpacity onPress={handleSharePost} style={{width: '100%'}}>
          <Box
            height={50}
            mx="md"
            borderRadius={10}
            borderWidth={2}
            borderColor="blue2"
            justifyContent="center"
            alignItems="center">
            <Text fontSize={20} fontWeight="500" color="blue2">
              Share Reels
            </Text>
          </Box>
        </TouchableOpacity>

        <BottomModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setVideoData={setVideoData}
        />
        <Loader isLoading={isLoading} title="Sharing to Reels ..." />
      </Box>
    </ScrollView>
  );
};

export default AddReels;
