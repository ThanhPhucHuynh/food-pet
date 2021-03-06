// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTheme } from '@shopify/restyle';
import React, { ReactNode } from 'react';
import { Text, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { theme, Text as TextStyle } from '../constants';
interface ButtonProps {
  variant: 'default' | 'primary' | 'transparent' | 'primaryView';
  label: string;
  onPress: () => void;
  children?: ReactNode;
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 15,
    fontFamily: 'Roboto-Light',
    textAlign: 'center',
  },
});

const Button = ({ variant, label, onPress, children, ...rest }: ButtonProps) => {
  // const backgroundColor = variant === 'primary' ? '#2cb9b0' : 'rgba(12,13,52,0.05)';
  // const theme = useTheme();

  const backgroundColor =
    variant === 'primaryView'
      ? theme.colors.primary
      : variant === 'primary'
      ? theme.colors.primary
      : variant === 'transparent'
      ? 'transparent'
      : theme.colors.defaultButton;
  const color = variant === 'primary' ? 'white' : theme.colors.titleBoarding;
  return (
    <RectButton style={[styles.container, { backgroundColor }]} {...{ onPress }}>
      {children ? (
        children
      ) : (
        <Text style={[styles.label, { color }]}>
          {variant === 'primaryView' ? 'View ' : ''}
          {label}
        </Text>
      )}
    </RectButton>
  );
};
Button.defaultProps = { variant: 'default' };
export default Button;
