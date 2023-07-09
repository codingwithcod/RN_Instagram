import {
  Image,
  ScrollView,
  StatusBar,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {FC, useEffect, useState} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../navigation/types';
import {CheckIcon, CloseIcon} from '../images';
import {p} from '../themes/light';
import Box from '../themes/Box';
import Text from '../themes/Text';
import Loader from '../components/Loader';
import ConfirmGalleryModal from '../components/ConfirmGalleryModal';
import {ImagePickerResponse} from 'react-native-image-picker';
import firestore from '@react-native-firebase/firestore';
import uploadFile from '../utils/uploadFile';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IProps = NativeStackScreenProps<IRootStackParamList, 'EditProfile'>;

const EditProfile: FC<IProps> = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageData, setImageData] = useState<ImagePickerResponse>({});
  const [name, setName] = useState<string | undefined>(
    route.params.profile?.name,
  );
  const [isName, setIsName] = useState(true);
  const [website, setWebsite] = useState<string | undefined>(
    route.params.profile?.website,
  );
  const [bio, setBio] = useState<string | undefined>(route.params.profile?.bio);
  const email = route.params.profile?.email;
  const photo = route.params.profile?.photo;
  const userId = route.params.profile?.userId;
  // console.log('------- name -------->', name);
  // console.log('------- bio -------->', bio);
  // console.log('------- website -------->', website);

  useEffect(() => {
    navigation.setOptions({
      header: () => <></>,
    });
  }, []);

  const handleUpdateProfile = async () => {
    if (isName === true) {
      setIsLoading(true);
      if (imageData.assets) {
        if (imageData.assets[0].fileName && imageData?.assets[0].uri) {
          const imageUrl = await uploadFile(
            imageData.assets[0].fileName,
            imageData.assets[0].uri,
          );
          if (imageUrl) {
            await AsyncStorage.setItem('USER_PHOTO', imageUrl);
          }
          firestore()
            .collection('users')
            .doc(userId)
            .update({
              name,
              photo: imageUrl,
              website,
              bio,
            })
            .then(res => {
              setIsLoading(false);
              navigation.goBack();
            })
            .catch(error => {
              setIsLoading(false);
              console.log(error);
            });
        }
      } else {
        firestore()
          .collection('users')
          .doc(userId)
          .update({
            name: name,
            bio: bio,
            website: website,
          })
          .then(res => {
            // console.log('---------- updated post res', res);
            setIsLoading(false);
            navigation.goBack();
          })
          .catch(error => {
            console.log(error);
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <>
      <Box
        bg="white"
        px="md"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between">
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{padding: 10}}>
          <Image
            source={CloseIcon}
            style={{width: 20, height: 20, tintColor: p.black}}
          />
        </TouchableOpacity>
        <Text fontSize={23} color="black" fontWeight="500">
          Edit Profile
        </Text>
        <TouchableOpacity onPress={handleUpdateProfile} style={{padding: 10}}>
          <Image
            source={CheckIcon}
            style={{width: 30, height: 30, tintColor: p.blueFaceBook}}
          />
        </TouchableOpacity>
      </Box>

      <ScrollView style={{flex: 1}}>
        <Box>
          <StatusBar backgroundColor={p.white} />
          <Box justifyContent="center" alignItems="center" mt="md">
            {imageData.assets ? (
              <Image
                source={{uri: imageData.assets[0].uri}}
                style={{height: 80, width: 80, borderRadius: 40}}
              />
            ) : (
              <Image
                source={{uri: photo}}
                style={{height: 80, width: 80, borderRadius: 40}}
              />
            )}

            <Box mt="sm" />
            <TouchableOpacity onPress={() => setIsModalOpen(true)}>
              <Text color="blue2" fontSize={16} fontWeight="500">
                Change profile photo
              </Text>
            </TouchableOpacity>
          </Box>

          <Box px="md" mt="lg">
            <Box borderBottomWidth={0.5} borderColor="lighGray">
              <Text fontSize={14}>Name</Text>

              <TextInput
                value={name}
                onChangeText={text => {
                  if (text.length < 3) {
                    setIsName(false);
                  } else {
                    setIsName(true);
                  }
                  setName(text);
                }}
                style={{
                  paddingLeft: 0,
                  paddingVertical: 5,
                  fontSize: 20,
                  fontWeight: '500',
                }}
              />
            </Box>
            {!isName && <Text color="red">* name is required </Text>}
          </Box>
          <Box px="md" mt="lg">
            <Box borderBottomWidth={0.5} borderColor="lighGray">
              <Text fontSize={14}>Username</Text>
              {email && (
                <TextInput
                  aria-disabled
                  value={email.substring(0, email.indexOf('@'))}
                  style={{
                    paddingLeft: 0,
                    paddingVertical: 5,
                    fontSize: 20,
                    fontWeight: '500',
                    color: p.lighGray,
                  }}
                />
              )}
            </Box>
          </Box>
          <Box px="md" mt="lg">
            <Box borderBottomWidth={0.5} borderColor="lighGray">
              <Text fontSize={14}>Website</Text>

              <TextInput
                value={website}
                onChangeText={text => setWebsite(text)}
                placeholder="write your website here"
                style={{
                  paddingLeft: 0,
                  paddingVertical: 5,
                  fontSize: 20,
                  fontWeight: '400',
                }}
              />
            </Box>
          </Box>
          <Box px="md" mt="lg" mb="sm">
            <Box borderBottomWidth={0.5} borderColor="lighGray">
              <Text fontSize={14}>Bio</Text>
              {route.params.profile?.name && (
                <TextInput
                  value={bio}
                  onChangeText={text => setBio(text)}
                  placeholder="write your bio here"
                  style={{
                    paddingLeft: 0,
                    paddingVertical: 5,
                    fontSize: 20,
                    fontWeight: '400',
                  }}
                />
              )}
            </Box>
            <Box
              mt="lg"
              mb="sm"
              pb="sm"
              borderBottomWidth={0.5}
              borderColor="lighGray">
              <TouchableOpacity>
                <Text fontSize={18} color="blue2">
                  Switch to Professional account
                </Text>
              </TouchableOpacity>
            </Box>
            <Box
              mt="md"
              mb="sm"
              pb="sm"
              borderBottomWidth={0.5}
              borderColor="lighGray">
              <TouchableOpacity>
                <Text fontSize={18} color="blue2">
                  Personal information settings
                </Text>
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
        <Loader isLoading={isLoading} title="Updating Profile..." />
        <ConfirmGalleryModal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          setImageData={setImageData}
        />
      </ScrollView>
    </>
  );
};

export default EditProfile;
