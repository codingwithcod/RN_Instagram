import {createTheme} from '@shopify/restyle';

export const p = {
  black: '#0B0B0B',
  white: '#F0F2F3',
  lighGray: '#c1c2c2',
  xLighGray: '#dadfe8',
  blue: '#0000FF',
  blueFaceBook: '#4287f5',
  red: 'red',
};

const theme = createTheme({
  colors: {
    white: p.white,
    black: p.black,
    lighGray: p.lighGray,
    blue: p.blue,
    blue2: p.blueFaceBook,
    red: p.red,
    xLighGray: p.xLighGray,
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
    },
    defaults: {
      fontSize: 12,
    },
  },
});

export type Theme = typeof theme;
export default theme;
