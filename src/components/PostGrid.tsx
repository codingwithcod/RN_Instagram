import {View, Text, Image, useWindowDimensions, FlatList} from 'react-native';
import React from 'react';
import Box from '../themes/Box';

const PostGrid = () => {
  const {width, height} = useWindowDimensions();
  return (
    <Box>
      <Box m="xs">
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
          }}
          style={{width: width / 3, height: 140}}
        />
      </Box>
      <Box>
        <Image
          source={{
            uri: 'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
          }}
          style={{width: width / 3, height: 140}}
        />
      </Box>
    </Box>
  );
};

export default PostGrid;
