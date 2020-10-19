import React from 'react';
import { StyleSheet, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { mixColor, mix, usePanGestureHandler, withSpring } from 'react-native-redash/lib/module/v1';

// import {useSpring} from 'react-native-redash'
import { Box, height, width } from '../../constants';

interface CardProps {
  position: Animated.Adaptable<number>;
  //   position: number;
}
const widthCard = width * 0.75;
const heightCard = widthCard * 1.2;

const CardHome = ({ position }: CardProps) => {
  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
  const backgroundColor = mixColor(position, '#C9E9E7', '#74BCB8');
  const translateY = mix(position, 0, -50);
  const translateX = withSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [-widthCard, 0, widthCard],
  });
  const scale = mix(position, 1, 0.9);
  return (
    <Box style={StyleSheet.absoluteFill} justifyContent="center" alignItems="center">
      <PanGestureHandler {...gestureHandler}>
        <Animated.View
          style={{
            width: widthCard,
            height: heightCard,
            backgroundColor,
            borderRadius: 24,
            transform: [{ translateY, translateX, scale }],
          }}
        />
      </PanGestureHandler>
    </Box>
  );
};

export default CardHome;
