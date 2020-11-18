import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { mixColor, mix, usePanGestureHandler, withSpring } from 'react-native-redash/lib/module/v1';

// import {useSpring} from 'react-native-redash'
import { Box, height, Text, width } from '../../constants';
import { HOST } from '../../constants/service';
import Button from '../Button';

interface CardProps {
  position: Animated.Adaptable<number>;
  product: {
    _id: string;
    name: string;
    description?: string;
    picture?: string[];
    price?: number;
    number?: number;
  };
  user?: any;
  numberSale: number;
}
const widthCard = width * 0.75;
const heightCard = widthCard * 1.7;
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
const CardHome = ({ position, product, numberSale, user }: CardProps) => {
  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();
  const backgroundColor = mixColor(position, '#C9E9E7', '#74BCB8');
  const navigation = useNavigation();
  const translateY = mix(position, 0, -50);
  const translateX = withSpring({
    value: translation.x,
    velocity: velocity.x,
    state,
    snapPoints: [-widthCard, 0, widthCard],
  });
  const scale = mix(position, 1, 0.9);
  useEffect(() => {}, []);
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
          }}>
          <Box style={{ marginTop: 20 }}>
            <Text
              textAlign="center"
              variant="titlePriceCard"
              style={{
                textTransform: 'uppercase',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 24,
              }}>
              Top {numberSale} Selling
            </Text>
          </Box>
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
          <Box style={{ marginTop: 20 }}>
            <Text
              textAlign="center"
              variant="titleHomeCard"
              style={{
                textTransform: 'uppercase',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 24,
              }}>
              {product.name}
            </Text>
          </Box>
          <Box style={{ marginTop: 20 }}>
            <Text
              textAlign="center"
              variant="titlePriceCard"
              style={{
                textTransform: 'uppercase',
                shadowColor: '#000',
                shadowOffset: {
                  width: 0,
                  height: 12,
                },
                shadowOpacity: 0.58,
                shadowRadius: 16.0,
                elevation: 24,
              }}>
              $ {product.price}
            </Text>
          </Box>

          <Box
            flex={0.5}
            alignItems="center"
            left={0}
            right={0}
            position="absolute"
            justifyContent="center"
            alignContent="center"
            bottom={20}>
            <Button
              onPress={async () => {
                navigation.navigate('ProductStack', {
                  screen: 'Detail',
                  params: {
                    product: { ...product },
                    _id: user ? user._id : '',
                    productId: product._id,
                  },
                });
              }}
              variant="primaryView"
              label=">"
            />
          </Box>
        </Animated.View>
      </PanGestureHandler>
    </Box>
  );
};

export default CardHome;
