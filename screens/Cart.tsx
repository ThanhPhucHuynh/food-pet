import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

const Cart = () => {
  return (
    <View>
      <Text>Cart Page</Text>
      <Button label="Cart" onPress={async () => {}} />
      <Text>Cart</Text>
    </View>
  );
};
export default Cart;
