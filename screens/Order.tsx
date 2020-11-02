import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { CollapsibleComponent, Header } from '../components';
import { Box, theme, width as tempWidth } from '../constants';
import { ApplicationState, checkOrder } from '../redux';

const Product = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const order = useSelector((state: ApplicationState) => state.orderReducer);
  useEffect(() => {
    (async () => {
      //   await dispatch(checkOrder());
      //   console.log('order', order);
      //   console.log('useEffect Order');
    })();
  }, []);

  const width = (tempWidth - theme.spacing.m * 2 - theme.spacing.s) / 2;
  return (
    <Box flex={1} backgroundColor="white">
      <Header label="Order" />
      <Text>haha</Text>

      <CollapsibleComponent />
    </Box>
  );
};

export default Product;
