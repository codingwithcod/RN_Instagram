import {FlatList, Image, StatusBar, useWindowDimensions} from 'react-native';
import React, {useCallback, useState} from 'react';
import Box from '../themes/Box';
import Video from 'react-native-video';
import Text from '../themes/Text';
import {
  CameraIcon,
  CommentIcon,
  LikeFillIcon,
  LikeIcon,
  MusicIcon,
  ShareIcon,
  ThreeDotsIcon,
} from '../images';
import {TapGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';

const ImageComponent = Animated.createAnimatedComponent(Image);

const Reels = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  console.log('--------------selectedIndex --------->', selectedIndex);

  const {width, height} = useWindowDimensions();
  const scale = useSharedValue(0);
  const doubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(300, withSpring(0));
      }
    });
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Math.max(scale.value, 0)}],
    };
  });

  return (
    <Box height={height - 40} style={{backgroundColor: 'blue'}}>
      <StatusBar backgroundColor={'#000'} />
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
              <Box height={height - 40} bg="black">
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
                    <Text fontSize={20} fontWeight="bold" color="white">
                      Reels
                    </Text>
                    <Image
                      source={CameraIcon}
                      style={{width: 25, height: 25, tintColor: '#fff'}}
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
                        <Text
                          color="white"
                          fontSize={14}
                          ml="sm"
                          fontWeight="bold">
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
                          <Text
                            color="white"
                            fontSize={14}
                            ml="sm"
                            fontWeight="700">
                            Follow
                          </Text>
                        </Box>
                      </Box>
                      <Box m="md" mb="lg">
                        <Text color="white" fontSize={12}>
                          Save these awesome chrome extenstion fo..
                        </Text>
                        <Text color="white" fontSize={12}>
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
                      bottom={15}
                      height={'80%'}>
                      <Box>
                        <Image
                          source={LikeIcon}
                          style={{width: 20, height: 20, tintColor: '#fff'}}
                        />
                        <Text color="white" fontSize={10}>
                          18.4k
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          source={CommentIcon}
                          style={{width: 20, height: 20, tintColor: '#fff'}}
                        />
                        <Text color="white" fontSize={10}>
                          18.4k
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          source={ShareIcon}
                          style={{width: 20, height: 20, tintColor: '#fff'}}
                        />
                        <Text color="white" fontSize={10}>
                          18.4k
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          source={ThreeDotsIcon}
                          style={{width: 20, height: 20, tintColor: '#fff'}}
                        />
                        <Text color="white" fontSize={10}>
                          18.4k
                        </Text>
                      </Box>
                      <Box>
                        <Image
                          source={MusicIcon}
                          style={{width: 20, height: 20}}
                        />
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
              <TapGestureHandler
                maxDelayMs={550}
                numberOfTaps={2}
                onActivated={doubleTap}>
                <Animated.View
                  style={{
                    position: 'absolute',
                    height,
                    width,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <ImageComponent
                    source={LikeFillIcon}
                    style={[
                      {width: 100, height: 100, tintColor: '#fff'},
                      animatedStyle,
                    ]}
                  />
                </Animated.View>
              </TapGestureHandler>
            </Box>
          );
        }}
      />
    </Box>
  );
};

export default Reels;
