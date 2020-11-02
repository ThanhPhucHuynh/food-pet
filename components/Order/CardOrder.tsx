import React from 'react';
import { Image, StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';

import { Box } from '../../constants';
import { HOST } from '../../constants/service';
import { OrderModel } from '../../redux';
type OrderState = {
  address: string;
  phone: string;
  more: string;
  products: [
    {
      productId: string;
      quantity: number;
      name: string;
      price: number;
      pictureItem: string;
    }
  ];
  price: number;
  status: number;
  createdAt: Date;
};
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
  text: {
    color: 'white',
    fontSize: 15,
  },
});
const CardOrder = ({ address, phone, more, products, price, status, createdAt }: OrderState) => {
  return (
    <Box>
      <Box>
        {products ? (
          products.map((product, i) => {
            console.log(product);

            return (
              <Animatable.View>
                <Box flexDirection="row">
                  <Box flex={0.3}>
                    <Box
                      position="relative"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      borderTopLeftRadius="xl"
                      //   backgroundColor="white"
                      margin="l">
                      <Animatable.View>
                        <Image
                          source={{ uri: HOST + product.pictureItem }}
                          style={{
                            ...StyleSheet.absoluteFillObject,
                            width: 50,
                            height: 50,
                            borderRadius: 24,
                          }}
                        />
                      </Animatable.View>
                    </Box>
                  </Box>
                  <Box flex={0.7}>
                    <Box
                      position="relative"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      borderTopLeftRadius="xl"
                      //   backgroundColor="white"
                      margin="l">
                      <Text style={styles.text}>
                        {product.name} <Text> X {product.quantity} </Text>{' '}
                      </Text>
                    </Box>
                  </Box>
                </Box>
              </Animatable.View>
            );
          })
        ) : (
          <></>
        )}
      </Box>
    </Box>
  );
};
export default CardOrder;
