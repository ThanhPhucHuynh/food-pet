import { textShadow } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from 'react-redux';

import { Button, CardProductCart, Header } from '../components';
import { Box } from '../constants';
import { AddToCartService, CartUserService } from '../constants/service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

interface CartItemProps {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  pictureItem: string;
}

const Cart = () => {
  const [cart, setCart] = useState<any>(null);
  const [products, setProducts] = useState<CartItemProps[]>([]);
  const [userID, setUserID] = useState<string>('');
  const [change, setChange] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      const data = await CartUserService();
      setCart(data);
      setUserID(data.userId);
      setProducts(data.products);
      console.log('Das', cart.products);
    })();
  }, [change]);
  const handIncreased = async (productId: string, quantity: number) => {
    console.log(productId, quantity);

    const itemIndex = products.findIndex((p) => p.productId == productId);

    await AddToCartService(
      userID,
      productId,
      quantity,
      products[itemIndex].name,
      products[itemIndex].price,
      products[itemIndex].pictureItem
    );
    setChange(!change);
  };
  return (
    <Box flex={1} backgroundColor="white">
      <Header label="Cart" />

      <ScrollView>
        <View>
          {cart !== null ? (
            cart.products.map((product, i) => (
              <CardProductCart
                onPress={handIncreased}
                // userId={userID}
                {...{ product }}
                key={i}
              />
              // <Text>hahas</Text>
            ))
          ) : (
            <Text>o</Text>
          )}
        </View>
      </ScrollView>
    </Box>
  );
};
export default Cart;
