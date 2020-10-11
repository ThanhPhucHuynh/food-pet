import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import Animated from 'react-native-reanimated';

import { Text as TextStyle } from '../../constants';
import Button from '../Button';
interface SubSlideProps {
  title: string;
  description: string;
  last?: boolean;
  x: Animated.Node<number>;
  onPress: () => void;
  isLogin: boolean;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 44,
    // backgroundColor: 'black',
    // borderTopLeftRadius: 75,
  },
  title: {
    margin: 0,
    // fontFamily: 'Raleway-SemiBold',
    // fontSize: 30,
    // color: '#0C0D34',
    textAlign: 'center',
    lineHeight: 30,
    marginBottom: 12,
    // backgroundColor: 'cyan',
    padding: 5,
  },
  description: {
    fontFamily: 'Raleway-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#0C0D34',
    textAlign: 'center',
    marginBottom: 20,
  },
});
const SubSlide = ({ title, description, last, onPress, x, isLogin }: SubSlideProps) => {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.title}>{title}</Text> */}
      <TextStyle variant="title2" style={styles.title}>
        {title}
      </TextStyle>

      <Text style={styles.description}>{description}</Text>
      {/* <Text>{last ? 'a' : 'b'}</Text> */}
      <Button
        label={last ? (isLogin ? 'Continue' : "Let's get started") : 'Next'}
        variant={last ? 'primary' : 'default'}
        {...{ onPress }}
      />
    </View>
  );
};
export default SubSlide;
