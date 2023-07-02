import {TouchableOpacity, Image} from 'react-native';
import React, {FC, useEffect} from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../navigation/types';
import Box from '../themes/Box';
import Text from '../themes/Text';
import {GoogleIcon, InstagramLogoIcon} from '../images';
import Touchable from '../themes/Touchable';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import AsyncStorage from '@react-native-async-storage/async-storage';

type IProps = NativeStackScreenProps<IRootStackParamList, 'Login'>;
interface IUser {
  id: string;
  name: string | null;
  email: string;
  photo: string | null;
  familyName: string | null;
  givenName: string | null;
}

const Login: FC<IProps> = ({navigation}) => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '529368980688-hkhbqq85sgvhkqdg925quklj26kfel12.apps.googleusercontent.com',
    });
  }, []);

  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      saveUserInfo(userInfo.user);
    } catch (error: any) {
      console.log('----- err --->', error);

      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const saveUserInfo = async (user: IUser) => {
    console.log('------- user ------->', user);

    try {
      const isUser = await checkUserExists(user.email);
      if (!isUser) {
        // const userId = uuid.v4();
        const newUser = await firestore().collection('users').doc(user.id).set({
          name: user.name,
          email: user.email,
          photo: user.photo,
          userId: user.id,
        });
        if (user.name && user.photo) {
          console.log('i am here ------------------>');

          await AsyncStorage.setItem('USER_NAME', user.name);
          await AsyncStorage.setItem('USER_EMAIL', user.email);
          await AsyncStorage.setItem('USERID', user.id);
          await AsyncStorage.setItem('USER_PHOTO', user.photo);
          navigation.navigate('Main');
        }
      } else {
        if (user.name && user.photo) {
          await AsyncStorage.setItem('USER_NAME', user.name);
          await AsyncStorage.setItem('USER_EMAIL', user.email);
          await AsyncStorage.setItem('USERID', user.id);
          await AsyncStorage.setItem('USER_PHOTO', user.photo);
          navigation.navigate('Main');
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const checkUserExists = async (email: string) => {
    return firestore()
      .collection('users')
      .where('email', '==', email)
      .get()
      .then(res => {
        return res.docs[0]?.data();
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <Box flex={1} justifyContent="center" alignItems="center">
      <Text
        fontSize={20}
        color="black"
        fontWeight="500"
        letterSpacing={1}
        mb="md">
        Signin with your Account
      </Text>
      <Box
        width={'90%'}
        height={200}
        justifyContent="space-around"
        alignItems="center">
        <Box>
          <Image source={InstagramLogoIcon} style={{width: 55, height: 55}} />
        </Box>
        <Box width={'80%'} alignItems="center">
          <Text fontSize={12} color="black" letterSpacing={1} mb="md">
            Sign in with Google
          </Text>
          <Touchable
            onPress={signIn}
            width={'90%'}
            borderWidth={1}
            borderColor="blue"
            px="lg"
            p="sm"
            borderRadius={10}
            flexDirection="row"
            justifyContent="space-around"
            alignItems="center">
            <Image source={GoogleIcon} style={{width: 25, height: 25}} />
            <Text fontSize={18} fontWeight="500" color="black">
              Login / Signup
            </Text>
          </Touchable>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
