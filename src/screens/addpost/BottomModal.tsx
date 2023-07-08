import React, {Dispatch, FC, SetStateAction} from 'react';
import Box from '../../themes/Box';
import Text from '../../themes/Text';
import {
  Image,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import {CameraColorIcon, GalleryIcon} from '../../images';

interface IProps {
  isModalOpen: boolean;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const BottomModal: FC<IProps> = ({isModalOpen, setIsModalOpen}) => {
  return (
    <Modal transparent visible={isModalOpen}>
      <TouchableWithoutFeedback onPress={() => setIsModalOpen(false)}>
        <Box flex={1} alignItems="center">
          <Box
            flexDirection="row"
            position="absolute"
            bottom={20}
            width={'95%'}
            height={120}
            borderRadius={10}
            elevation={5}
            bg="xLighGray"
            justifyContent="space-around"
            alignItems="center">
            <TouchableOpacity>
              <Box justifyContent="center" alignItems="center">
                <Image
                  source={CameraColorIcon}
                  style={{width: 60, height: 60}}
                />
                <Text fontSize={16} color="black" mt="sm">
                  Open Camera
                </Text>
              </Box>
            </TouchableOpacity>
            <TouchableOpacity>
              <Box justifyContent="center" alignItems="center">
                <Image source={GalleryIcon} style={{width: 60, height: 60}} />
                <Text fontSize={16} color="black" mt="sm">
                  Choose from Gallery
                </Text>
              </Box>
            </TouchableOpacity>
          </Box>
        </Box>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BottomModal;
