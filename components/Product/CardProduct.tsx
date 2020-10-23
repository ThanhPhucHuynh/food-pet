import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, { Extrapolate, interpolate } from 'react-native-reanimated';
import { mixColor, mix, usePanGestureHandler, withSpring } from 'react-native-redash/lib/module/v1';

import { Box, Text } from '../../constants';
import { HOST } from '../../constants/service';

interface CardProductProps {
  color: string;
  aspectRatio: number;
  id: string;
  width: number;
  product: {
    _id: string;
    name: string;
    type: string;
    description: string;
    picture: string[];
    price: number;
    number: number;
  };
  onPress: () => void;
}
const styles = StyleSheet.create({
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 40,
  },
});
const CardProduct = ({
  color: backgroundColor,
  aspectRatio,
  width,
  product,
  onPress,
}: CardProductProps) => {
  const opacity = new Animated.Value(0);
  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();

  const translateY = mix(50, 0, -50);
  const translateX = withSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [-width, 0, width],
    // onSnap: ([x]) => x !== 0 && onSwipe(),
  });
  return (
    <Box
      borderRadius="m"
      marginBottom="m"
      style={{
        // backgroundColor,
        width,
        height: width * aspectRatio,
      }}>
      <TouchableOpacity style={{ ...StyleSheet.absoluteFillObject }} {...{ onPress }}>
        <Box
          margin="s"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.2}
          flex={0.2}>
          <Text style={{ backgroundColor: 'white' }}>{product.type ? product.type : ''}</Text>
        </Box>
        <Box
          borderRadius="m"
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          opacity={0.2}
          flex={1}
          style={{
            backgroundColor,
          }}
        />
        <Box flex={0.7}>
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            borderTopLeftRadius="xl"
            margin="xl">
            <Animated.View style={styles.underlay}>
              <Image
                source={{ uri: HOST + product.picture[0] }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  borderRadius: 24,
                }}
              />
            </Animated.View>
          </Box>
        </Box>
        <Box flex={0.3}>
          <Box>
            <Text
              textAlign="center"
              variant="titleProductCard"
              style={{
                textTransform: 'uppercase',
              }}>
              {product.name}
            </Text>
          </Box>
          <Box marginLeft="s">
            <Text
              opacity={0.5}
              textAlign="center"
              variant="titlePriceProductCard"
              style={{
                textDecorationLine: 'line-through',
              }}>
              ${(product.price * (130 / 100)).toFixed(2)}
            </Text>
            <Text textAlign="center" variant="titlePriceProductCard" style={{ fontSize: 16 }}>
              ${product.price}
            </Text>
          </Box>
        </Box>
      </TouchableOpacity>
    </Box>
  );
};
export default CardProduct;
