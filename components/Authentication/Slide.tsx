import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

import { width, height } from '../../constants';

interface SlideProps {
  label: string;
  right?: boolean;
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
});
const Slide = ({ label, right }: SlideProps) => {
  const transform = [
    { translateY: (height * 0.61 - 100) / 2 },
    { translateX: (right ? 1 : -1) * (width / 2 - 50) },
    { rotate: right ? '-90deg' : '90deg' },
  ];

  return (
    <View style={styles.container}>
      <View style={[styles.titleContainer, { transform }]}>
        <Text style={styles.title}>{label}</Text>
      </View>
    </View>
  );
};
export default Slide;
