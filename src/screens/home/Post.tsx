import React, {FC, memo, useCallback, useEffect, useState} from 'react';
import Box from '../../themes/Box';
import Text from '../../themes/Text';
import {Image} from 'react-native';
import {
  CommentIcon,
  LikeFillIcon,
  LikeIcon,
  SaveIcon,
  ShareIcon,
  ThreeDotsIcon,
} from '../../images';
import {IPost} from './Home';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring,
} from 'react-native-reanimated';
import {TapGestureHandler} from 'react-native-gesture-handler';
import firestore from '@react-native-firebase/firestore';

interface IProps {
  item: IPost;
  userId: string | undefined;
}

const ImageComponent = Animated.createAnimatedComponent(Image);

const Post: FC<IProps> = ({item, userId}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [post, setPost] = useState(item);

  const scale = useSharedValue(0);
  const doubleTap = useCallback(() => {
    scale.value = withSpring(1, undefined, isFinished => {
      if (isFinished) {
        scale.value = withDelay(300, withSpring(0));
      }
    });
    likePost(item.postId);
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{scale: Math.max(scale.value, 0)}],
    };
  });

  const likePost = async (id: string) => {
    if (isLiked) {
      return;
    }
    setIsLiked(true);
    setPost(prev => {
      const {likes, ...rest} = prev;
      likes.push('userId');
      return prev;
    });
    firestore()
      .collection('posts')
      .doc(id)
      .update({likes: firestore.FieldValue.arrayUnion(userId)})
      .then(res => {
        // console.log('---- res ----> ', res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    checkIsPostLiked();
  }, []);

  const checkIsPostLiked = useCallback(() => {
    if (userId) {
      const isLiked = item.likes?.find(like => (like = userId));
      if (isLiked) {
        setIsLiked(true);
      }
    }
  }, []);

  return (
    <Box>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        px="xs"
        pr="sm">
        <Box flexDirection="row" alignItems="center" my="sm">
          <Box
            mr="md"
            width={45}
            height={45}
            borderWidth={0.5}
            borderRadius={23}
            borderColor="black"
            justifyContent="center"
            alignItems="center">
            <Image
              source={{uri: item.userPhoto}}
              style={{width: 40, height: 40, borderRadius: 20}}
            />
          </Box>

          <Box>
            <Text fontSize={18} fontWeight="500" color="black">
              {item.userName}
            </Text>
            <Text>Indore MP</Text>
          </Box>
        </Box>
        <Box>
          <Image source={ThreeDotsIcon} style={{width: 20, height: 20}} />
        </Box>
      </Box>
      <Box>
        <Image
          source={{
            uri: item.image,
          }}
          style={{width: '100%', height: 320}}
        />
        <TapGestureHandler
          maxDelayMs={550}
          numberOfTaps={2}
          onActivated={doubleTap}>
          <Animated.View
            style={{
              position: 'absolute',
              height: '100%',
              width: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ImageComponent
              source={LikeFillIcon}
              style={[
                {width: 110, height: 110, tintColor: '#fff'},
                animatedStyle,
              ]}
            />
          </Animated.View>
        </TapGestureHandler>
      </Box>
      <Box
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
        m="sm"
        mx="md">
        <Box flexDirection="row">
          <Image
            source={isLiked ? LikeFillIcon : LikeIcon}
            style={{width: 20, height: 20}}
          />
          <Box mx="sm" />
          <Image source={CommentIcon} style={{width: 20, height: 20}} />
          <Box mx="sm" />
          <Image source={ShareIcon} style={{width: 20, height: 20}} />
        </Box>
        <Box>
          <Image source={SaveIcon} style={{width: 20, height: 20}} />
        </Box>
      </Box>
      <Box m="sm" mx="md">
        <Text fontSize={16} fontWeight="bold">
          {item.likes?.length ? item.likes.length : 0} Likes
        </Text>
        <Text fontSize={14}>{item.caption}</Text>
        <Text fontSize={14}>{new Date(item.createdAt).getDate()} July </Text>
      </Box>
    </Box>
  );
};

export default memo(Post);
