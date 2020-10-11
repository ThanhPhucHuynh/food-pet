import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

const Product = () => {
  return (
    <View>
      <Text>Product Page</Text>
      <Button label="Product" onPress={async () => {}} />
      <Text>Product</Text>
    </View>
  );
};
export default Product;
