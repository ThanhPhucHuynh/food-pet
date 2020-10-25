import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from 'react-redux';

import { Button, Header } from '../components';
import { Box } from '../constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

const Cart = () => {
  return (
    <Box flex={1} backgroundColor="white">
      <Header label="Cart" />
      <Box flex={1} />
    </Box>
  );
};
export default Cart;
