import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../components';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

const Product = () => {
  const navigation = useNavigation();
  return (
    <View>
      <Text>Product Page</Text>
      <Button label="Product" onPress={() => navigation.dispatch(DrawerActions.openDrawer())} />
      <Text>Product</Text>
    </View>
  );
};
export default Product;
