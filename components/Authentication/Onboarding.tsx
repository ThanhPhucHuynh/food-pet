import { StatusBar } from 'expo-status-bar';
import React, { useRef } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import Animated, { multiply, divide, interpolate, Extrapolate } from 'react-native-reanimated';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash/lib/module/v1';
import { useSelector, useDispatch } from 'react-redux';

import { width, height, slides, theme } from '../../constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthNavigationProps } from '../../navigation/Navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../../redux';
import Dot from './Dot';
import Slide from './Slide';
import SubSlide from './Subslide';
// interface ComponentNameProps {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  slider: {
    height: 0.61 * height,
  },
  footer: {
    flex: 1,
  },
  footerContent: {
    flex: 1,
    backgroundColor: 'white',
    borderTopLeftRadius: theme.borderRadii.xl,
    borderTopRightRadius: theme.borderRadii.xl,
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
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    overflow: 'hidden',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: 55,
    // borderBottomLeftRadius: 55,
  },
});
export const assets = slides.map((slide) => slide.picture);
const Onboarding = ({ navigation }: AuthNavigationProps<'Onboarding'>) => {
  const scroll = useRef<Animated.ScrollView>(null);
  const x = useValue(0);
  const onScroll = onScrollEvent({ x });

  const backgroundColor = interpolateColor(x, {
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((slide) => slide.color),
  });
  const dispatch = useDispatch();
  const userIs = useSelector((state: ApplicationState) => state.userReducer);
  React.useEffect(() => {
    dispatch(checkIsLogin());
  }, [userIs.isLogin]);
  // console.log(userIs);
  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <Animated.View style={[styles.slider, { backgroundColor }]}>
        {slides.map(({ picture }, index) => {
          const opacity = interpolate(x, {
            inputRange: [(index - 0.5) * width, index * width, (index + 0.5) * width],
            outputRange: [0, 1, 0],
            extrapolate: Extrapolate.CLAMP,
          });
          return (
            <Animated.View key={index} style={[styles.underlay, { opacity }]}>
              <Image source={picture} style={styles.picture} />
            </Animated.View>
          );
        })}
        <Animated.ScrollView
          ref={scroll}
          horizontal
          snapToInterval={width}
          decelerationRate="normal"
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
                  isLogin={!!userIs.isLogin}
                  onPress={() => {
                    // eslint-disable-next-line no-unused-expressions
                    last
                      ? userIs.isLogin
                        ? navigation.navigate('Home')
                        : navigation.navigate('Welcome')
                      : scroll.current
                          ?.getNode()
                          .scrollTo({ x: width * (index + 1), animated: true });
                    // else if (scroll.current) {
                    //   scroll.current.getNode().scrollTo({ x: width * (index + 1), animated: true });
                    // }
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
