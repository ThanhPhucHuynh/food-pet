import React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import Animated from 'react-native-reanimated';

interface SubSlideProps {
  title: string;
  description: string;
  last?: boolean;
  x: Animated.Node<number>;
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
    fontFamily: 'Raleway-SemiBold',
    fontSize: 30,
    color: '#0C0D34',
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
const SubSlide = ({ title, description, last, x }: SubSlideProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
      {/* <Text>{last ? 'a' : 'b'}</Text> */}
      <Button onPress={() => {}} title={last ? "Let's get started" : 'Next'} />
    </View>
  );
};
export default SubSlide;
