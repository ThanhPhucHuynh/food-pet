import React, { ReactNode } from 'react';
import { View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { useValue, onScrollEvent, interpolateColor } from 'react-native-redash/lib/module/v1';
interface SwipeableProps {
  children: ReactNode;
}

const SwipeableRow = ({ children }: SwipeableProps) => {
  const translateX = useValue(0);
  return <View>{children}</View>;
};

export default SwipeableRow;
