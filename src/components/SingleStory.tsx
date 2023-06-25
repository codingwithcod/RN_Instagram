import {Image, ImageSourcePropType, StyleSheet} from 'react-native';
import React, {FC} from 'react';
import Box from '../themes/Box';
import Text from '../themes/Text';
import LinearGradient from 'react-native-linear-gradient';
// interface IStory {
//   username: string;
//   img: ImageSourcePropType;
//   isSeen: boolean;
// }

const SingleStory = ({item}) => {
  // console.log('username ---------------<>', item);
  const {username, img, isSeen} = item;

  return (
    <Box m="sm" justifyContent="center" alignItems="center">
      <LinearGradient
        colors={['#FEDA75', '#FA7E1E', '#D62976', '#962FBF']}
        style={styles.linearGradient}>
        <Box borderRadius={50} borderColor="white" borderWidth={2}>
          <Image source={{uri: img}} style={styles.img} />
        </Box>
      </LinearGradient>
      <Text>{username}</Text>
    </Box>
  );
};

export default SingleStory;

const styles = StyleSheet.create({
  img: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  linearGradient: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
});
