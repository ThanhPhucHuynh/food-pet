import { DrawerNavigationProp } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import { useTheme } from '@shopify/restyle';
import React, { useEffect, useState } from 'react';
import { View, Text, AsyncStorage, ScrollView, BackHandler, FlatList } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/src/styles/colors';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector, useDispatch } from 'react-redux';

import { BackgroundHome, Button, CardProduct, Header, SearchBar } from '../components';
import { Box, colorArray, height, theme, width as tempWidth } from '../constants';
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
  const [limit, setLimit] = useState<number>(1);
  useEffect(() => {
    (async () => {
      setLimit(1);
      dispatch(checkIsLogin());
      if (filler.length !== 0 || searchText !== '') {
        setProducts(await getAllProduct(limit, searchText, filler));
      } else setProducts(await getAllProduct(limit));
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
            setFiller([...textArray]);
          }}
          onChangeSearch={(text) => {
            setSearchText(text);
          }}
        />
      </Box>

      <Box
        justifyContent="center"
        alignItems="center"
        alignContent="center"
        style={{ height: height / 1.21 }}>
        <FlatList
          data={products}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item, index }) => {
            return (
              <Box margin="s">
                <CardProduct
                  productId={item._id}
                  index={index}
                  onPress={() => {
                    // navigation.navigate('Detail', { product, _id: user ? user._id : '' });
                    navigation.navigate('ProductStack', {
                      screen: 'Detail',
                      params: {
                        product: { ...item },
                        _id: user ? user._id : '',
                        productId: item._id,
                      },
                    });
                  }}
                  key={item._id}
                  // color={colorArray[Math.floor(Math.random() * colorArray.length)]}
                  color="rgba(171, 168, 168, 0.75)"
                  aspectRatio={(210 + Math.floor(Math.random() * 20)) / 145}
                  // aspectRatio={210 / 145}
                  id={item._id}
                  width={width}
                  product={item}
                />
              </Box>
            );
          }}
          onEndReachedThreshold={0.01} // so when you are at 5 pixel from the bottom react run onEndReached function
          onEndReached={async () => {
            if ([...products].length > 8) {
              setLimit(limit + 1);
              setProducts([...products].splice(0, limit * 8));
            }
          }}
        />
      </Box>

      <Box flex={1} />
    </Box>
  );
};
export default Product;
