// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { BaseTheme, createBox, createText, createTheme } from '@shopify/restyle';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',
  blueDark: '#0C0D34',
  secondary: '#0c0d34',
  // blueDark: '#e6b800',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',

  grey: '#F4F0EF',
  defaultButton: 'rgba(12,13,52,0.05)',
  silverHeader: '#888888d4',
  color1: '#00b3a6',
  color2: '#ff4417',
  color3: '#e6aa05',
  color4: '#ff7293',
  color5: '#411db8',
};

const theme: BaseTheme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    titleBoarding: palette.blueDark,
    white: 'white',
    primary: '#2cb9b0',
    defaultButton: palette.defaultButton,
    slide_grey: palette.grey,
    grey: 'rgba(12,13,52,0.05)',
    black: palette.black,
    title: 'rgba(12,13,52,0.7)',
    secondary: palette.secondary,
    red: 'red',
    greenLight: palette.greenLight,
    blueDark: palette.blueDark,
    color1: '#00b3a6',
    color2: '#ff4417',
    color3: '#f7f1c3',
    color4: '#ff7293',
    color5: '#411db8',
    blueWhite: '#6fc3cd',
    silverHeader: palette.silverHeader,
  },
  spacing: {
    baby: 2,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  borderRadii: {
    s: 4,
    m: 10,
    l: 25,
    xl: 50,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    hero: {
      fontSize: 80,
      lineHeight: 80,
      fontFamily: 'Raleway-Bold',
      color: 'white',
      textAlign: 'center',
    },
    title1: {
      fontSize: 28,
      fontFamily: 'Raleway-SemiBold',
      color: 'primary',
    },
    title: {
      fontSize: 16,
      lineHeight: 30,
      fontFamily: 'Raleway-Regular',
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: 'Anodina-ExtraBold',
      color: 'titleBoarding',
    },
    titleButton: {
      fontSize: 15,
      lineHeight: 30,
      fontFamily: 'Anodina-ExtraBold',
      color: 'titleBoarding',
    },
    titleDraw: {
      fontSize: 20,
      lineHeight: 30,
      fontFamily: 'Raleway-Regular',
      color: 'white',
    },
    titleHeader: {
      fontSize: 18,
      lineHeight: 30,
      fontFamily: 'Raleway-Bold',
      color: 'black',
    },
    body: {
      fontSize: 16,
      lineHeight: 30,
      fontFamily: 'Raleway-Regular',
      color: 'title',
    },
    error: {
      fontSize: 15,
      lineHeight: 30,
      fontFamily: 'Raleway-Regular',
      color: 'red',
    },
    name: {
      fontSize: 30,
      lineHeight: 30,
      fontFamily: 'Raleway-Regular',
      color: 'blueDark',
    },
    email: {
      fontSize: 10,
      lineHeight: 30,
      fontFamily: 'Raleway-Regular',
      color: 'blueDark',
    },
  },
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export { width, height, theme };
export const Drawer_Width = width * 0.8;
