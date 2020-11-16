import { AntDesign, Entypo } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { ActivityIndicator, Colors } from 'react-native-paper';
import Swipeable from 'react-native-swipeable';

import { Box, Text, width } from '../../constants';
import { HOST } from '../../constants/service';

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
    padding: 10,
    margin: 10,
    borderRadius: 75,
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 40,
  },
  leftAction: {
    flex: 0.5,
    backgroundColor: '#497AFC',
    justifyContent: 'center',
  },
  actionText: {
    color: 'white',
    fontSize: 16,
    backgroundColor: 'transparent',
    padding: 10,
  },
  rightAction: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
});
interface CardProductCartProps {
  product: any;
  userId?: any;
  onPress: (productId: string, quantity: number) => void;
}

const CardProductCart = ({ product, onPress, userId }: CardProductCartProps) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [item, setItem] = useState<CartItemProps>();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [loadingMinus, setLoadingMinus] = React.useState<boolean>(false);
  const [loadingPlush, setLoadingPlush] = React.useState<boolean>(false);
  const swipeableRef = useRef(null);
  useEffect(() => {
    const { productId, quantity, name, price, pictureItem } = product;
    setItem({ productId, quantity, name, price, pictureItem });
    console.log(productId, 's');
  }, []);

  const leftContent = <Text>Pull to activate</Text>;

  const rightButtons = [
    <TouchableOpacity
      style={{ flex: 1 }}
      onPress={async () => {
        setLoading(true);
        await onPress(product.productId, 0);
        setLoading(false);
      }}>
      <Animatable.View
        animation="fadeIn"
        duration={100}
        style={{
          flex: 1,
          opacity: 0.5,
          backgroundColor: 'red',
          margin: 10,
          justifyContent: 'space-around',
          flexDirection: 'column',
          alignItems: 'flex-start',
          borderTopLeftRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        {!loading ? (
          <AntDesign style={{ margin: 20 }} name="delete" size={17} color="white" />
        ) : (
          <ActivityIndicator style={{ margin: 20 }} animating color={Colors.white} />
        )}
      </Animatable.View>
    </TouchableOpacity>,
  ];

  return (
    <Swipeable
      key={product.productId}
      ref={swipeableRef}
      rightActionActivationDistance={200}
      leftContent={leftContent}
      autoClose
      rightButtons={rightButtons}>
      <Animatable.View>
        <Box
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: 'silver',
            opacity: 0.1,
            margin: 5,
            borderRadius: 20,
          }}
        />
        <Animated.View>
          <Box flexDirection="row" style={{ width, margin: 10 }}>
            <Box style={{ height: 100, width: 100, backgroundColor: '#fed80e', borderRadius: 20 }}>
              <Animatable.View style={styles.underlay} animation="fadeIn" duration={1000}>
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
              </Box>
              <Box margin="s" flexDirection="row">
                <Box>
                  <Text style={{ fontSize: 20, lineHeight: 30, color: '#29b0a5' }}>
                    ${product.price * product.quantity}
                  </Text>
                </Box>
                <Box>
                  <Text
                    opacity={0.5}
                    style={{
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
                    onPress={async () => {
                      setLoadingMinus(true);
                      await onPress(product.productId, product.quantity - 1);
                      setLoadingMinus(false);
                    }}>
                    {!loadingMinus ? (
                      <AntDesign name="minuscircle" size={20} color="#7d9696" />
                    ) : (
                      <ActivityIndicator animating color={Colors.red800} />
                    )}
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
                  <TouchableOpacity
                    onPress={async () => {
                      setLoadingPlush(true);
                      await onPress(product.productId, product.quantity + 1);
                      setLoadingPlush(false);
                    }}>
                    {!loadingPlush ? (
                      <AntDesign name="pluscircle" size={20} color="#7d9696" />
                    ) : (
                      <ActivityIndicator animating color={Colors.red800} />
                    )}
                  </TouchableOpacity>
                </Box>
              </Box>
            </Box>
            <Box margin="s" justifyContent="center">
              <Entypo name="chevron-small-right" style={{ margin: 5 }} size={24} color="black" />
            </Box>
          </Box>
        </Animated.View>
      </Animatable.View>
    </Swipeable>
  );
};
export default CardProductCart;
