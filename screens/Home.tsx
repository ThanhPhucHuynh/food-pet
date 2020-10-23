import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, BackHandler, Alert, StyleSheet } from 'react-native';
import { interpolate } from 'react-native-reanimated';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useTransition } from 'react-native-redash/lib/module/v1';
import { useSelector, useDispatch } from 'react-redux';

import { BackgroundHome, Button, Header, CardHome } from '../components';
import { Box } from '../constants';
import { getAllProduct } from '../constants/service';
import { StackNavigationProps } from '../navigation';
import { AuthenticationRoutes } from '../navigation/Navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

export const assets = [];

const cards = [
  // { index: 6 },
  // { index: 5 },
  // { index: 4 },
  // { index: 3 },
  { index: 2 },
  { index: 1 },
  { index: 0 },
];

const Home = ({ navigation }: StackNavigationProps<AuthenticationRoutes, 'Home'>) => {
  const { user, isLogin } = useSelector((state: ApplicationState) => state.userReducer);
  const dispatch = useDispatch();
  const [currentIndex, setCurrentIndex] = useState(0);
  const aIndex = useTransition(currentIndex);
  const [products, setProducts] = useState([]);
  useEffect(() => {
    (async () => {
      dispatch(checkIsLogin());

      const backHandler = BackHandler.addEventListener('hardwareBackPress', () => !!user);
      setProducts(await getAllProduct());
      console.log('useEffect Home');
      return () => backHandler.remove();
    })();
  }, [isLogin]);
  // console.log(products);

  return (
    <Box flex={1} backgroundColor="white">
      <Header label="Home Pets" />
      <Box flex={1}>
        <BackgroundHome />
        {products.map(
          (product, index) =>
            products.length - index - 1 >= currentIndex && (
              <CardHome
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
        )}
        {/* <CardHome position={1} />
        <CardHome position={0.5} />
        <CardHome position={0} /> */}
      </Box>
    </Box>
  );
};
export default Home;
