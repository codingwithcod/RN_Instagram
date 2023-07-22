import React, {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import Box from '../../themes/Box';
import Text from '../../themes/Text';
import {Image, TouchableOpacity} from 'react-native';
import {
  ActivityIcon,
  ArchiveIcon,
  CloseFriendsIcon,
  DiscoverPeopleIcon,
  FavoriteIcon,
  GridIcon,
  GuideIcon,
  LiveIcon,
  LogOutIcon,
  PeopleIcon,
  QRIcon,
  ReelsIcon,
  SaveIcon,
  SettingIcon,
  StoryHighlightIcon,
  StoryIcon,
} from '../../images';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {IRootStackParamList} from '../../navigation/types';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface IProps {
  isCreateOpen: -1 | 0 | 1;
  setIsCreateOpen: Dispatch<SetStateAction<-1 | 0 | 1>>;
}

type NavigationPropType = NavigationProp<IRootStackParamList>;

const ProfileBottomSheet: FC<IProps> = ({isCreateOpen, setIsCreateOpen}) => {
  const navigation = useNavigation<NavigationPropType>();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handleSheetChanges = useCallback((index: number) => {
    if (index === -1) {
      setIsCreateOpen(-1);
    }
  }, []);

  const singOut = async () => {
    GoogleSignin.signOut()
      .then(async res => {
        console.log('---- singOut res ------>', res);
      })
      .catch(err => {
        console.log('---- singOut err ------>', err);
      });
    await AsyncStorage.removeItem('USER_NAME');
    await AsyncStorage.removeItem('USER_EMAIL');
    await AsyncStorage.removeItem('USERID');
    await AsyncStorage.removeItem('USER_PHOTO');
    navigation.navigate('Login');
  };

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={isCreateOpen}
      snapPoints={snapPoints}
      enablePanDownToClose
      onChange={handleSheetChanges}>
      <Box>
        <Box
          borderBottomWidth={0.5}
          borderColor="lighGray"
          pb="sm"
          justifyContent="center"
          alignItems="center">
          <Text fontSize={18} fontWeight="bold" color="black">
            Create
          </Text>
        </Box>
        {isCreateOpen === 0 ? (
          <Box mx="sm">
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={ReelsIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Reels
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={GridIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Post
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={StoryIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Story
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image
                  source={StoryHighlightIcon}
                  style={{width: 20, height: 20}}
                />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Story Highlight
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={LiveIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Live
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={GuideIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Guide
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        ) : (
          <Box mx="sm">
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={SettingIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Settings
                </Text>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={GridIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Post
                </Text>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={ActivityIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Your activity
                </Text>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={ArchiveIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Archive
                </Text>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={QRIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  QR code
                </Text>
              </Box>
            </TouchableOpacity>

            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={SaveIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Saved
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image source={PeopleIcon} style={{width: 20, height: 20}} />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Supervision
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image
                  source={CloseFriendsIcon}
                  style={{width: 20, height: 20, tintColor: '#000'}}
                />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Close friends
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image
                  source={FavoriteIcon}
                  style={{width: 20, height: 20, tintColor: '#000'}}
                />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Favorites
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box flexDirection="row" p="sm">
                <Image
                  source={DiscoverPeopleIcon}
                  style={{width: 20, height: 20, tintColor: '#000'}}
                />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Discover people
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity onPress={singOut}>
              <Box flexDirection="row" p="sm">
                <Image
                  source={LogOutIcon}
                  style={{width: 20, height: 20, tintColor: '#000'}}
                />
                <Text fontSize={18} ml="md" fontWeight="400" color="black">
                  Logout
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        )}
      </Box>
    </BottomSheet>
  );
};

export default ProfileBottomSheet;
