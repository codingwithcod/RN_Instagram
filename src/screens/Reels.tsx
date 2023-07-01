import {FlatList, Image, useWindowDimensions} from 'react-native';
import React, {useState} from 'react';
import Box from '../themes/Box';
import Video from 'react-native-video';
import Text from '../themes/Text';
import {
  CameraIcon,
  CommentIcon,
  LikeIcon,
  MusicIcon,
  ShareIcon,
  ThreeDotsIcon,
} from '../images';

const Reels = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log('--------------selectedIndex --------->', selectedIndex);

  const {width, height} = useWindowDimensions();
  return (
    <Box height={height - 55} bg="black">
      <FlatList
        pagingEnabled
        showsVerticalScrollIndicator={false}
        onScroll={e =>
          setSelectedIndex(Math.ceil(e.nativeEvent.contentOffset.y / height))
        }
        data={[
          require('../images/storyAssets/video1.mp4'),
          require('../images/storyAssets/video2.mp4'),
          require('../images/storyAssets/video3.mp4'),
          require('../images/storyAssets/video4.mp4'),
          require('../images/storyAssets/video1.mp4'),
          require('../images/storyAssets/video2.mp4'),
          require('../images/storyAssets/video3.mp4'),
          require('../images/storyAssets/video4.mp4'),
        ]}
        renderItem={({item, index}) => {
          return (
            <Box>
              <Box height={height - 55} bg="black">
                <Video
                  source={item}
                  resizeMode="cover"
                  repeat
                  paused={selectedIndex === index ? false : true}
                  style={{
                    position: 'absolute',
                    top: 0,
                    bottom: 0,
                    right: 0,
                    left: 0,
                  }}
                />
                <Box position="absolute" top={0} bottom={0} right={0} left={0}>
                  <Box
                    justifyContent="space-between"
                    alignItems="center"
                    flexDirection="row"
                    mt="sm"
                    marginHorizontal="md">
                    <Text fontSize={24} fontWeight="bold" color="white">
                      Reels
                    </Text>
                    <Image
                      source={CameraIcon}
                      style={{width: 35, height: 35, tintColor: '#fff'}}
                    />
                  </Box>
                  <Box
                    flexDirection="row"
                    height={'40%'}
                    width={'100%'}
                    position="absolute"
                    bottom={0}>
                    <Box width={'85%'} position="absolute" bottom={0}>
                      <Box mt="xl" />
                      <Box flexDirection="row" alignItems="center" mt="md">
                        <Box
                          height={40}
                          width={40}
                          bg="lighGray"
                          borderRadius={20}
                        />
                        <Text color="white" fontSize={20} ml="sm">
                          Manoj Solanki
                        </Text>
                        <Box
                          ml="md"
                          px="sm"
                          borderWidth={1}
                          borderColor="white"
                          borderRadius={5}
                          justifyContent="center"
                          alignItems="center">
                          <Text color="white" fontSize={20} ml="sm">
                            Follow
                          </Text>
                        </Box>
                      </Box>
                      <Box m="md">
                        <Text color="white" fontSize={16}>
                          Save these awesome chrome extenstion fo..
                        </Text>
                        <Text color="white" fontSize={18}>
                          ismaity . GOAT
                        </Text>
                      </Box>
                    </Box>
                    <Box
                      width={'15%'}
                      alignItems="center"
                      justifyContent="space-around"
                      position="absolute"
                      right={0}
                      bottom={0}
                      height={'80%'}>
                      <Box>
                        <Image
                          source={LikeIcon}
                          style={{width: 25, height: 25, tintColor: '#fff'}}
                        />
                        <Text color="white" fontSize={10}>
                          18.4k
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          source={CommentIcon}
                          style={{width: 25, height: 25, tintColor: '#fff'}}
                        />
                        <Text color="white" fontSize={10}>
                          18.4k
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          source={ShareIcon}
                          style={{width: 25, height: 25, tintColor: '#fff'}}
                        />
                        <Text color="white" fontSize={10}>
                          18.4k
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          source={ThreeDotsIcon}
                          style={{width: 25, height: 25, tintColor: '#fff'}}
                        />
                        <Text color="white" fontSize={10}>
                          18.4k
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          source={MusicIcon}
                          style={{width: 25, height: 25}}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default Reels;
