import { Feather } from '@expo/vector-icons';
import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { BackHandler, Image, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import * as Animatable from 'react-native-animatable';
import DropdownAlert from 'react-native-dropdownalert';
import { Button, Card, Chip } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import { SharedElement } from 'react-navigation-shared-element';
import { useSelector, useDispatch } from 'react-redux';

// import { } from '../constants/service'
import { AlertHelper, Header } from '../components';
import { Box, height, width, Text } from '../constants';
import { HOST, AddToCartService } from '../constants/service';
import { AuthenticationRoutes, HomeRoutes, StackNavigationProps } from '../navigation';
import { ApplicationState, checkCart, checkIsLogin } from '../redux';
interface DetailProps {
  _id: string;
  product: {
    _id: string;
    name: string;
    type: string;
    description: string;
    picture: string[];
    price: number;
    number: number;
  };
}
const styles = StyleSheet.create({
  underlay: {
    // height: height / 3.5,
    //   width: width
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 40,
  },
});
const Detail = ({ navigation }: StackNavigationProps<HomeRoutes, 'HomeRoot'>) => {
  //   const navigation = useNavigation();
  const dispatch = useDispatch();
  let endAncestor;
  let endNode;
  const route = useRoute<any>();
  const [product, setProduct] = useState<any>();
  const [pics, setPics] = useState<string[]>([]);

  const [name, setName] = useState<string>('');
  const [productID, setProductID] = useState<string>('');

  const [number, setNumber] = useState<number>();
  const [numberChoose, setNumberChoose] = useState<number>(1);
  const [index, setIndex] = useState<number>(0);
  const [price, setPice] = useState<number>();

  const [type, setType] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [userID, setUserID] = useState('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  //state Cart
  const { user, isLogin } = useSelector((state: ApplicationState) => state.userReducer);

  // console.log(route.params.product);

  const Cover = () => (
    <Card>
      <Card.Cover source={{ uri: HOST + product.picture[0] }} />
    </Card>
  );

  useEffect(() => {
    // console.log(route.params);

    setIndex(0);
    dispatch(checkIsLogin());
    if (route.params) {
      setPice(route.params.product.price);
      if (isLogin) {
        setUserID(user._id);
      } else setUserID('');
      setProduct(route.params.product);
      setProductID(route.params.product._id);
      setPics(route.params.product.picture);
      setName(route.params.product.name);
      setType(route.params.product.type);
      setDescription(route.params.product.description);
      setNumber(route.params.product.number);
    }
  }, [route.params.product._id, userID, name]);
  const AddToCart = async () => {
    setIsLoading(true);
    const data = await AddToCartService(userID, productID, numberChoose, name, price, pics[0]);
    await dispatch(checkCart());
    setIsLoading(false);
  };
  return (
    <Animatable.View
      useNativeDriver
      animation="fadeInRight"
      duration={500}
      style={{
        flex: 1,
        backgroundColor: 'white',
      }}>
      <Header label="Detail" />
      <ScrollView>
        <Box>
          <Box borderTopLeftRadius="xl" margin="xl" style={{ height: 'auto' }}>
            <SharedElement id={`item.${route.params.productId}.photo`}>
              <Box style={{ height: height * 0.4 }}>
                <Animated.View style={styles.underlay}>
                  {/* <SharedElement style={styles.underlay} onNode={(node) => (endNode = node)}> */}
                  <Image
                    source={{ uri: HOST + pics[index] }}
                    style={{
                      ...StyleSheet.absoluteFillObject,
                      width: undefined,
                      height: undefined,
                      borderRadius: 24,
                    }}
                  />
                </Animated.View>
              </Box>
            </SharedElement>

            <Animated.View
              style={{
                margin: 2,
                height: 100,
              }}>
              <Box
                justifyContent="center"
                alignItems="center"
                style={{
                  ...StyleSheet.absoluteFillObject,
                  marginTop: 10,
                }}>
                <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  {pics.map((pic, i) => {
                    const width = i === index ? 75 : 50;
                    const height = width;
                    const borderWidth = index === i ? 1 : 0;
                    return (
                      <Box
                        justifyContent="center"
                        alignItems="center"
                        key={i}
                        style={{ margin: 5, height: height + 2, width, borderWidth }}>
                        <TouchableOpacity onPress={() => setIndex(i)}>
                          <Image
                            source={{ uri: HOST + pic }}
                            style={{
                              width: width - 4,
                              height: width - 4,
                              borderWidth,
                              padding: 2,
                              borderRadius: 2,
                            }}
                          />
                        </TouchableOpacity>
                      </Box>
                    );
                  })}
                </ScrollView>
              </Box>
            </Animated.View>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Text variant="titleHeader" style={{ fontSize: 30 }}>
              {name}
            </Text>
          </Box>
          <Box justifyContent="center" alignItems="center" margin="m" flexDirection="row">
            <Chip icon="information">{type}</Chip>
            <Chip style={{ marginLeft: 9 }}>max: {number}</Chip>
          </Box>
          <Box justifyContent="center" alignItems="center">
            <Text variant="titleHeader" style={{ fontSize: 20 }}>
              Introduction:
            </Text>
            <Box margin="l">
              <Text variant="" style={{ fontSize: 12, lineHeight: 30 }}>
                {description}
              </Text>
            </Box>
          </Box>
        </Box>
        <View>
          <Box
            flexDirection="row"
            style={{
              // width,
              margin: 15,
            }}
            // alignContent="space-between"
            justifyContent="space-around">
            <Box flexDirection="row">
              <Box
                style={{
                  // width: 30,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  color="black"
                  mode="outlined"
                  onPress={() => {
                    if (numberChoose !== 0) {
                      setNumberChoose(numberChoose - 1);
                    }
                  }}>
                  -
                </Button>
              </Box>
              <Box
                style={{
                  height: 30,
                  width: 50,
                  // borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{ fontSize: 30 }}>{numberChoose}</Text>
              </Box>
              <Box
                style={{
                  // borderWidth: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Button
                  mode="outlined"
                  color="black"
                  onPress={() => {
                    if (numberChoose !== number) {
                      setNumberChoose(numberChoose + 1);
                    }
                  }}>
                  +
                </Button>
              </Box>
            </Box>
            <Box>
              <Button
                color="black"
                mode="outlined"
                disabled={userID === ''}
                loading={isLoading}
                labelStyle={{ color: userID === '' ? 'silver' : 'red' }}
                onPress={async () => {
                  await AddToCart();
                  AlertHelper.show('success', 'Error', 'Finish add to cart');
                }}>
                {userID === '' ? 'Login pls' : 'ADD TO CART'}
              </Button>
            </Box>
          </Box>
        </View>
      </ScrollView>
      {/* <DropdownAlert ref={(ref) => (dropdown = ref)} /> */}
    </Animatable.View>
  );
};

export default Detail;
