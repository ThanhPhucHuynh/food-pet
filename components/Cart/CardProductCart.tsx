import { AntDesign } from '@expo/vector-icons';
import { backgroundColor } from '@shopify/restyle';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Animated, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { PanGestureHandler } from 'react-native-gesture-handler';
import { Button } from 'react-native-paper';
import { mixColor, mix, usePanGestureHandler, withSpring } from 'react-native-redash/lib/module/v1';

import { Box, Text, width } from '../../constants';
import { AddToCartService, HOST } from '../../constants/service';
import FABComponent from './FAB';
import ListAvtion from './ListAction';
interface CartItemProps {
  productId: string | '';
  quantity: number | 0;
  name: string | '';
  price: number | 0;
  pictureItem: string | '';
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
interface CardProductCartProps {
  product: any;
  userId: any;
  onPress: (productId: string, quantity: number) => void;
}
const CardProductCart = ({ product, onPress, userId }: CardProductCartProps) => {
  const { gestureHandler, translation, velocity, state } = usePanGestureHandler();

  const [widthAction, setWidthAction] = useState<boolean>(false);
  const [item, setItem] = useState<CartItemProps>();

  // const [name,setName] = useState

  useEffect(() => {
    const { productId, quantity, name, price, pictureItem } = product;
    setItem({ productId, quantity, name, price, pictureItem });
    console.log(productId, 's');
  }, []);

  return (
    <Animatable.View style={{ flex: 1 }}>
      <Box
        style={{
          ...StyleSheet.absoluteFillObject,
          backgroundColor: 'silver',
          opacity: 0.2,
          margin: 5,
          borderRadius: 5,
        }}
      />
      <Animated.View>
        <Box flexDirection="row" style={{ height: 'auto', width, margin: 10 }}>
          <Box style={{ height: 100, width: 100 }}>
            <Animatable.View
              style={styles.underlay}
              animation="fadeIn"
              // ref={(ref) => (startAncestor = nodeFromRef(ref))}
              duration={1000}>
              <Image
                source={{ uri: HOST + product.pictureItem }}
                style={{
                  ...StyleSheet.absoluteFillObject,
                  width: undefined,
                  height: undefined,
                  borderRadius: 24,
                }}
              />
            </Animatable.View>
          </Box>
          <Box flex={1} style={{ marginLeft: 10 }}>
            <Box flexDirection="row" justifyContent="space-between">
              <Box>
                <Text variant="nameCart">{product.name}</Text>
              </Box>
              <Box style={{ marginRight: 20 }}>
                <TouchableOpacity onPress={() => onPress(product.productId, 0)}>
                  <AntDesign name="delete" size={17} color="red" />
                </TouchableOpacity>
              </Box>
            </Box>
            <Box margin="s">
              <Box>
                <Text variant="priceCart">${product.price * product.quantity}</Text>
              </Box>
              <Box>
                <Text
                  opacity={0.5}
                  style={{
                    // marginLeft: 20,
                    textDecorationLine: 'line-through',
                  }}>
                  {(product.price * (130 / 100)).toFixed(2)}
                </Text>
              </Box>
            </Box>
            <Box flexDirection="row">
              <Box
                style={{
                  margin: 5,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  style={{ width: 24 }}
                  onPress={() => onPress(product.productId, product.quantity - 1)}>
                  <AntDesign name="minuscircle" size={24} color="black" />
                </TouchableOpacity>
              </Box>
              <Box
                style={{
                  margin: 5,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 20 }}>{product.quantity}</Text>
              </Box>
              <Box
                style={{
                  margin: 5,
                  width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => onPress(product.productId, product.quantity + 1)}>
                  <AntDesign name="pluscircle" size={24} color="black" />
                </TouchableOpacity>
              </Box>
            </Box>
          </Box>
        </Box>
      </Animated.View>
    </Animatable.View>
  );
};
export default CardProductCart;
