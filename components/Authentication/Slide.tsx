import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
// import Animated from 'react-native-reanimated';

import { width, height } from '../../constants';

interface SlideProps {
  label: string;
  right?: boolean;
  // picture: number;
}
const styles = StyleSheet.create({
  container: {
    width,
  },
  title: {
    fontSize: 80,
    lineHeight: 80,
    fontFamily: 'Raleway-Bold',
    color: 'white',
    textAlign: 'center',
  },
  titleContainer: {
    // backgroundColor: 'black',
    justifyContent: 'center',
  },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: 55,
    // borderBottomLeftRadius: 55,
  },
});
const Slide = ({ label, right }: SlideProps) => {
  const transform = [
    { translateY: (height * 0.61 - 100) / 2 },
    { translateX: (right ? -1 : 1) * (width / 2 - 50) },
    { rotate: right ? '-90deg' : '90deg' },
  ];

  return (
    <View style={styles.container}>
      {/* <Animated.View style={styles.underlay}>
        <Image source={picture} style={styles.picture} />
      </Animated.View> */}
      <View style={[styles.titleContainer, { transform }]}>
        <Text style={styles.title}>{label}</Text>
      </View>
    </View>
  );
};
export default Slide;
