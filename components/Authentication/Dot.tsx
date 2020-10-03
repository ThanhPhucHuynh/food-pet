import React from 'react';
import Animated, { interpolate, Extrapolate } from 'react-native-reanimated';
// import { transform2d } from 'react-native-redash/lib/module/v1';
// import Animated from "react-native-reanimated";
interface DotProps {
  index: number;
  currentIndex: Animated.Node<number>;
  color: string[];
}

const Dot = ({ index, currentIndex, color }: DotProps) => {
  const opacity = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [0.5, 1, 0.5],
    extrapolate: Extrapolate.CLAMP,
  });
  const scale = interpolate(currentIndex, {
    inputRange: [index - 1, index, index + 1],
    outputRange: [1, 1.5, 1],
    extrapolate: Extrapolate.CLAMP,
  });
  return (
    <Animated.View
      style={{
        opacity,
        // backgroundColor: '#2cb9b0',
        backgroundColor: color[index],
        height: 8,
        width: 8,
        borderRadius: 4,
        margin: 4,
        transform: [{ scale }],
      }}
    />
  );
};

export default Dot;
