import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Animated, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { Transition } from 'react-native-reanimated';
import { mix, usePanGestureHandler, withSpring } from 'react-native-redash/lib/module/v1';
import { SharedElement } from 'react-navigation-shared-element';

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
  index: number;
  onPress: () => void;
  productId: string;
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
  productId,
  onPress,
  index,
}: CardProductProps) => {
  const [load, setLoad] = useState(true);
  const x = new Animated.Value(0);
  const { translation, velocity, state } = usePanGestureHandler();
  const ref = useRef();
  const translateY = mix(50, 0, -50);
  const translateX = withSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [-width, 0, width],
  });
  useEffect(() => {
    setLoad(!load);
  }, [productId]);
  const scale = x.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [1, 1.1, 1.2],
  });
  const transition = () => (
    <Transition.Together>
      <Transition.In type="scale" durationMs={1000} interpolation="easeIn" />
    </Transition.Together>
  );
  let startAncestor;
  let startNode;
  return (
    <Animatable.View
      useNativeDriver
      animation="fadeIn"
      duration={100}
      delay={index + 150}
      style={{
        width,
        height: width * aspectRatio,
        borderRadius: 8,
        marginBottom: 8,
      }}>
      <Animated.View
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
              <SharedElement id={`item.${productId}.photo`} style={styles.underlay}>
                <Animatable.View style={styles.underlay} animation="fadeIn" duration={1000}>
                  <Image
                    source={{ uri: HOST + product.picture[0] }}
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      width: undefined,
                      height: undefined,
                      borderRadius: 24,
                    }}
                  />
                </Animatable.View>
              </SharedElement>
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
                variant="titlePriceProductCardDiscord"
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
      </Animated.View>
    </Animatable.View>
  );
};
export default CardProduct;
