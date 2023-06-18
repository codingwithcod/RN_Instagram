import {createTheme} from '@shopify/restyle';

const palette = {
  black: '#0B0B0B',
  white: '#F0F2F3',
  lighGray: '#c1c2c2',
};

const theme = createTheme({
  colors: {
    white: palette.white,
    black: palette.black,
    lighGray: palette.lighGray,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
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
      lineHeight: 20,
    },
  },
});

export type Theme = typeof theme;
export default theme;
