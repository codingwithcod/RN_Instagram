import {
  Animated,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  useWindowDimensions,
  View,
} from 'react-native';
import React, {FC, useRef, useState} from 'react';
import Box from '../themes/Box';
import {p} from '../themes/light';
import {LikeIcon, ShareIcon} from '../imges';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {IRootStackParamList} from '../navigation/types';
import Video from 'react-native-video';

const data = [
  {
    content: require('../imges/storyAssets/img1.jpg'),
    type: 'image',
    finish: 0,
  },
  {
    content: require('../imges/storyAssets/img2.jpg'),
    type: 'image',
    finish: 0,
  },
  {
    content: require('../imges/storyAssets/video1.mp4'),
    type: 'video',
    finish: 0,
  },
  {
    content: require('../imges/storyAssets/img1.jpg'),
    type: 'image',
    finish: 0,
  },
  {
    content: require('../imges/storyAssets/video2.mp4'),
    type: 'video',
    finish: 0,
  },
  {
    content: require('../imges/storyAssets/video3.mp4'),
    type: 'video',
    finish: 0,
  },
  {
    content: require('../imges/storyAssets/video4.mp4'),
    type: 'video',
    finish: 0,
  },
];

type IProps = NativeStackScreenProps<IRootStackParamList, 'ShowStory'>;

const ShowStory: FC<IProps> = ({navigation}) => {
  const [current, setCurrent] = useState(0);
  const [content, setContent] = useState(data);
  const [isLoaded, setIsLoaded] = useState(false);
  const {width, height} = useWindowDimensions();

  const gotoPrevStory = () => {
    if (current === 0) {
      setCurrent(0);
    } else {
      let tempData = content;
      tempData[current].finish = 0;
      setContent(tempData);
      progress.setValue(0);
      setCurrent(prev => prev - 1);
    }
  };
  const gotoNextStory = () => {
    if (current !== content.length - 1) {
      let tempData = content;
      tempData[current].finish = 1;
      setContent(tempData);
      progress.setValue(0);
      setCurrent(prev => prev + 1);
    } else {
      progress.setValue(0);
      navigation.goBack();
    }
  };

  const progress = useRef(new Animated.Value(0)).current;

  const start = () => {
    if (content[current].type === 'video') {
      if (isLoaded) {
        Animated.timing(progress, {
          toValue: 1,
          duration: 5000,
          useNativeDriver: false,
        }).start(({finished}) => {
          if (finished) {
            gotoNextStory();
          }
        });
      }
    }
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000,
      useNativeDriver: false,
    }).start(({finished}) => {
      if (finished) {
        gotoNextStory();
      }
    });
  };

  return (
    <Box flex={1} bg="black">
      <StatusBar backgroundColor={'#000'} barStyle="light-content" />
      <Box
        position="absolute"
        flexDirection="row"
        top={10}
        zIndex={50}
        width={width}>
        {content.map((item, index) => {
          return (
            <Box
              flex={1}
              height={3}
              //   width={'10%'}
              bg={'lighGray'}
              mx="xs"
              justifyContent="space-between"
              flexDirection="row">
              <Animated.View
                style={{
                  flex: current === index ? progress : content[index].finish,
                  height: 4,
                  backgroundColor: '#000',
                }}></Animated.View>
            </Box>
          );
        })}
      </Box>

      <ScrollView scrollEnabled={false}>
        <Box height={height - 70} width={width}>
          {content[current].type === 'video' ? (
            <Video
              source={content[current].content}
              resizeMode="cover"
              paused={false}
              onReadyForDisplay={() => start()}
              onLoad={() => {
                setIsLoaded(true);
                start();
              }}
              style={{width: '100%', height: '100%'}}
            />
          ) : (
            <Image
              source={content[current].content}
              onLoadEnd={() => {
                progress.setValue(0);
                start();
              }}
              style={{width: '100%', height: '100%', resizeMode: 'cover'}}
            />
          )}

          <Box
            width={'100%'}
            height={'100%'}
            position="absolute"
            top={0}
            flexDirection="row"
            justifyContent="space-between">
            <TouchableOpacity
              onPress={gotoPrevStory}
              style={{
                width: '30%',
                height: '100%',
              }}></TouchableOpacity>
            <TouchableOpacity
              onPress={gotoNextStory}
              style={{
                width: '30%',
                height: '100%',
              }}></TouchableOpacity>
          </Box>
        </Box>
        <KeyboardAvoidingView>
          <Box
            zIndex={60}
            flexDirection="row"
            padding="sm"
            pb="md"
            alignItems="center">
            <Box width={'75%'}>
              <TextInput
                placeholder="Send message"
                placeholderTextColor={'#fff'}
                style={{
                  borderWidth: 1,
                  borderColor: p.lighGray,
                  borderRadius: 30,
                  paddingLeft: 10,
                  width: '100%',
                  height: 45,
                  color: '#FFF',
                }}
              />
            </Box>
            <Box
              width={'25%'}
              flexDirection="row"
              justifyContent="space-evenly">
              <Image
                source={LikeIcon}
                style={{width: 30, height: 30, tintColor: '#fff'}}
              />
              <Image
                source={ShareIcon}
                style={{width: 30, height: 30, tintColor: '#fff'}}
              />
            </Box>
          </Box>
        </KeyboardAvoidingView>
      </ScrollView>
    </Box>
  );
};

export default ShowStory;

const styles = StyleSheet.create({});
