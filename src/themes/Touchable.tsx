import {TouchableOpacity, GestureResponderEvent} from 'react-native';
import React, {FC} from 'react';
import Box from './Box';
import {BoxProps} from '@shopify/restyle';
import {Theme} from './light';

interface IProps extends BoxProps<Theme> {
  children: React.ReactNode;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
}

const Touchable: FC<IProps> = props => {
  const {onPress, children, ...restProps} = props;
  return (
    <TouchableOpacity onPress={onPress}>
      <Box {...restProps}>{children}</Box>
    </TouchableOpacity>
  );
};

export default Touchable;
