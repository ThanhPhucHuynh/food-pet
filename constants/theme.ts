import { BaseTheme, createText, createTheme } from '@shopify/restyle';
import { Dimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',
  blueDark: '#0C0D34',
  // blueDark: '#e6b800',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#F0F2F3',

  defaultButton: 'rgba(12,13,52,0.05)',
};

const theme: BaseTheme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    titleBoarding: palette.blueDark,
    white: 'white',
    primary: '#2cb9b0',
    defaultButton: palette.defaultButton,
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
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
      color: '#0c0d34',
    },
    title2: {
      fontSize: 24,
      lineHeight: 30,
      fontFamily: 'Raleway-SemiBold',
      color: 'titleBoarding',
    },
    body: {
      fontSize: 16,
      lineHeight: 30,
      fontFamily: 'Raleway-Regular',
      color: 'rgba(12,13,52,0.7)',
    },
  },
});

export type Theme = typeof theme;
export const Text = createText<Theme>();
export { width, height, theme };
