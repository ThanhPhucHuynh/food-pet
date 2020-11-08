import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, ScrollView, BackHandler } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector, useDispatch } from 'react-redux';

import { BackgroundHome, Button, CardProduct, Header, SearchBar } from '../components';
import { Box, colorArray, theme, width as tempWidth } from '../constants';
import { getAllProduct } from '../constants/service';
import { AuthNavigationProps, HomeRoutes, StackNavigationProps } from '../navigation/Navigation';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

interface productsProps {
  _id: string;
  name: string;
  type: string;
  description: string;
  picture: string[];
  price: number;
  number: number;
}
const Product = () => {
  const navigation = useNavigation();
  // const { navigate, goBack } = useNavigation<DrawerNavigationProp<HomeRoutes, ''>>();
  const { user, isLogin } = useSelector((state: ApplicationState) => state.userReducer);
  const dispatch = useDispatch();
  const [products, setProducts] = useState<productsProps[]>([]);
  const [searchText, setSearchText] = useState('');
  const [filler, setFiller] = useState<string[]>([]);
  const [isReander, setIsRender] = useState<boolean>(true);
  useEffect(() => {
    (async () => {
      dispatch(checkIsLogin());
      if (filler.length !== 0 || searchText !== '') {
        setProducts(await getAllProduct(searchText, filler));
      } else setProducts(await getAllProduct());
      console.log('useEffect Product');
    })();
  }, [isLogin, searchText, filler]);

  const width = (tempWidth - theme.spacing.m * 2 - theme.spacing.s) / 2;
  return (
    <Box flex={1} backgroundColor="white">
      {/* <BackgroundHome /> */}
      <Header label="Products" />
      <Box margin="m">
        <SearchBar
          onChangeFiller={async (textArray) => {
            // console.log('change filtter');

            setFiller([...textArray]);
          }}
          onChangeSearch={(text) => {
            setSearchText(text);
          }}
        />
      </Box>
      <ScrollView contentContainerStyle={{ paddingHorizontal: theme.spacing.m }}>
        <Box flexDirection="row">
          <Box marginRight="s">
            {products ? (
              products
                .filter((_, i) => i % 2 !== 0)
                .map((product, i) => (
                  <CardProduct
                    productId={product._id}
                    index={i}
                    onPress={() => {
                      // navigation.navigate('Detail', { product, _id: user ? user._id : '' });
                      navigation.navigate('ProductStack', {
                        screen: 'Detail',
                        params: { product, _id: user ? user._id : '', productId: product._id },
                      });
                    }}
                    key={product._id}
                    color={colorArray[Math.floor(Math.random() * colorArray.length)]}
                    // color="rgba(171, 168, 168, 0.75)"
                    aspectRatio={(210 + Math.floor(Math.random() * 20)) / 145}
                    // aspectRatio={210 / 145}
                    id={product._id}
                    width={width}
                    product={product}
                  />
                ))
            ) : (
              <Text>NoProduct</Text>
            )}
          </Box>
          <Box>
            {products ? (
              products
                .filter((_, i) => i % 2 === 0)
                .map((product, i) => (
                  <CardProduct
                    productId={product._id}
                    index={i}
                    key={i}
                    onPress={() => {
                      navigation.navigate('ProductStack', {
                        screen: 'Detail',
                        params: { product, _id: user ? user._id : '', productId: product._id },
                      });
                    }}
                    // key={product._id}
                    color={colorArray[Math.floor(Math.random() * colorArray.length)]}
                    // color="rgba(171, 168, 168, 0.75)"
                    aspectRatio={(210 + Math.floor(Math.random() * 20)) / 145}
                    // aspectRatio={210 / 145}
                    id={product._id}
                    product={product}
                    width={width}
                  />
                ))
            ) : (
              <Text>NoProduct</Text>
            )}
          </Box>
        </Box>
      </ScrollView>
      <Box flex={1} />
    </Box>
  );
};
export default Product;
