import {View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import React, {memo} from 'react';
import Box from '../../themes/Box';
import {LocationIcon, SearchIcon} from '../../images';
import {p} from '../../themes/light';

const SearchHeader = () => {
  return (
    <Box p="sm" px="md" flexDirection="row" height={60}>
      <Box
        flexDirection="row"
        bg="xLighGray"
        width={'88%'}
        alignItems="center"
        px="md"
        borderRadius={10}>
        <Image
          source={SearchIcon}
          style={{width: 18, height: 18, tintColor: p.black}}
        />
        <Box mx="sm" />
        <TextInput
          placeholder="Search"
          placeholderTextColor={'#aaa'}
          style={{fontSize: 18, color: p.black}}
        />
        {/* </Box> */}
      </Box>
      <Box width={'12%'} justifyContent="center" alignItems="flex-end">
        <TouchableOpacity>
          <Image
            source={LocationIcon}
            style={{width: 30, height: 30, tintColor: p.black}}
          />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};

export default memo(SearchHeader);
