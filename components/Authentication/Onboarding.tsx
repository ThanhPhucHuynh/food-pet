import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef } from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { multiply, divide } from 'react-native-reanimated';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash/lib/module/v1';

import { width, height, slides } from '../../constants';
import Dot from './Dot';
import Slide from './Slide';
import SubSlide from './Subslide';
//data slider
// interface ComponentNameProps {}

const styles = StyleSheet.create({
  container: {
    // width,
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: 0.61 * height,
    // borderBottomRightRadius: 75,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: 75,
    borderTopRightRadius: 75,
  },
  pagination: {
    ...StyleSheet.absoluteFillObject,
    height: 75,
    width,
    paddingTop: 10,
    justifyContent: 'center',
    textAlign: 'center',
    flexDirection: 'row',
  },
});

const Onboarding = ({ navigation }) => {
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useValue(0);
  const onScroll = onScrollEvent({ x });

  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  // console.log(typeof backgroundColor);

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          bounces={false}
          scrollEventThrottle={1}
          {...{ onScroll }}>
          {slides.map(({ label, picture }, index) => (
            <Slide key={index} {...{ label, picture }} right={index % 2 === 0} />
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

        <Animated.View style={styles.footerContent}>
          <View style={styles.pagination}>
            {slides.map((_, index) => (
              <Dot
                color={slides.map((slide) => slide.color)}
                key={index}
                currentIndex={divide(x, width)}
                {...{ index, x }}
              />
            ))}
          </View>
          <Animated.View
            style={{
              width: width * slides.length,
              flexDirection: 'row',
              flex: 1,
              transform: [{ translateX: multiply(x, -1) }],
            }}>
            {slides.map(({ title, description }, index) => {
              const last = index === slides.length - 1;
              return (
                <SubSlide
                  onPress={() => {
                    if (last) {
                      navigation.navigate('Welcome');
                    } else if (scroll.current) {
                      scroll.current.getNode().scrollTo({ x: width * (index + 1), animated: true });
                    }
                  }}
                  key={index}
                  last={index === slides.length - 1}
                  {...{ title, description, x }}
                />
              );
            })}
          </Animated.View>
        </Animated.View>
      </View>
    </View>
  );
};

export default Onboarding;
