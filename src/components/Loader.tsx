import React, {FC} from 'react';
import {ActivityIndicator, Modal} from 'react-native';
import Box from '../themes/Box';
import Text from '../themes/Text';
import {p} from '../themes/light';

interface IProps {
  isLoading: boolean;
  title?: string;
}

const Loader: FC<IProps> = ({isLoading, title}) => {
  return (
    <Modal transparent visible={isLoading}>
      <Box
        flex={1}
        justifyContent="center"
        alignItems="center"
        style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
        <ActivityIndicator size={60} color={p.white} />
        <Text fontSize={20} fontWeight="400" mt="md" color="white">
          {title}
        </Text>
      </Box>
    </Modal>
  );
};

export default Loader;
