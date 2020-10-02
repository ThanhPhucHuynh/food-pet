import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { multiply } from 'react-native-reanimated';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash/lib/module/v1';

import { width, height, slides } from '../../constants';
import Slide from './Slide';
import SubSlide from './Subslide';
//data slider
// interface ComponentNameProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: 0.61 * height,
    borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 75,
    flexDirection: 'row',
  },
});

const Onboarding = () => {
  const x = useValue(0);
  const onScroll = onScrollEvent({ x });
  // const backgroundColor = interpolateColor(x, {
  //   inputRange: [0, width, width * 2, width * 3],
  //   outputRange: ['#BFEAF5', '#BEECC4', '#FFE4D9', '#FFDDDD'],
  // });
  // console.log(slides);

  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{ onScroll }}>
          {slides.map(({ label }, index) => (
            <Slide key={index} {...{ label }} right={index % 2 === 0} />
          ))}
        </Animated.ScrollView>
      </Animated.View>
      <View style={styles.footer}>
        <Animated.View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor,
          }}
        />
        <Animated.View
          style={[
            styles.footerContent,
            { width: width * slides.length, flex: 1, transform: [{ translateX: multiply(x, -1) }] },
          ]}>
          {slides.map(({ title, description }, index) => (
            <SubSlide
              key={index}
              last={index === slides.length - 1}
              {...{ title, description, x }}
            />
          ))}
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;
