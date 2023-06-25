import {FlatList, View} from 'react-native';
import React from 'react';
import Box from '../themes/Box';
import Text from '../themes/Text';
import {stories} from '../constants/storyData';
import SingleStory from './SingleStory';

const Stories = () => {
  // console.log('stories ---------------<>', stories);
  return (
    <Box margin="sm">
      <FlatList
        data={stories}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({item}) => {
          return <SingleStory item={item} />;
        }}
      />
    </Box>
  );
};

export default Stories;
