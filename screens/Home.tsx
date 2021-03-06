import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, BackHandler, Alert, StyleSheet } from 'react-native';
import { interpolate } from 'react-native-reanimated';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTransition } from 'react-native-redash/lib/module/v1';
import { useSelector, useDispatch } from 'react-redux';

import { BackgroundHome, Button, Header, CardHome } from '../components';
import { Box } from '../constants';
import { getAllProduct, getTopProduct } from '../constants/service';
import { StackNavigationProps } from '../navigation';
import { AuthenticationRoutes } from '../navigation/Navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

export const assets = [];

const cards = [{ index: 2 }, { index: 1 }, { index: 0 }];

const Home = ({ navigation }: StackNavigationProps<AuthenticationRoutes, 'Home'>) => {
  const { user, isLogin } = useSelector((state: ApplicationState) => state.userReducer);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const aIndex = useTransition(currentIndex);
  const [products, setProducts] = useState([]);
  const noProduct = {
    _id: 'no',
    name: 'NO INTERNET',
    picture: [''],
  };
  useEffect(() => {
    (async () => {
      dispatch(checkIsLogin());

      // const backHandler = BackHandler.addEventListener('hardwareBackPress', () => !!user);
      setProducts(await getTopProduct());
      console.log('useEffect Home');
      // return () => backHandler.remove();
    })();
  }, [isLogin]);
  // console.log(products);

  return (
    <Box flex={1} backgroundColor="white">
      <Header label="Home Pets" />
      <Box flex={1}>
        <BackgroundHome />
        {products ? (
          products.map(
            (product, index) =>
              products.length - index - 1 >= currentIndex && (
                <CardHome
                  {...{ user }}
                  numberSale={products.length - index}
                  key={index}
                  // number = {index}
                  position={interpolate(products.length - 1 - index, {
                    inputRange: [aIndex, products.length - 1],
                    outputRange: [0, 1],
                  })}
                  product={product}
                />
              )
          )
        ) : (
          <CardHome
            numberSale={1}
            key={1}
            // number = {index}
            position={interpolate(1, {
              inputRange: [1, 1],
              outputRange: [0, 1],
            })}
            product={noProduct}
          />
        )}
        {/* <CardHome position={1} />
        <CardHome position={0.5} />
        <CardHome position={0} /> */}
      </Box>
    </Box>
  );
};
export default Home;
