import { Fontisto } from '@expo/vector-icons';
import { backgroundColor } from '@shopify/restyle';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Picker, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Divider, IconButton, List, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import RNPickerSelect from 'react-native-picker-select';
import { SafeAreaView } from 'react-native-safe-area-context';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Slider from 'react-native-slider';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';

import { CardProductCart, CheckButton, Header, Button as ButtonComponent } from '../components';
import { BackgroundPicture, Box, height, Text, width } from '../constants';
import { AddToCartService, CartUserService } from '../constants/service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  AddToCartServiceRedux,
  ApplicationState,
  buyCart,
  checkCart,
  checkIsLogin,
  checkOrder,
} from '../redux';
interface CartItemProps {
  productId: string;
  quantity: number;
  name: string;
  price: number;
  pictureItem: string;
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  header: {
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  panelHandle: {
    width: 30,
    height: 7,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 4,
  },
  opacity: { ...StyleSheet.absoluteFillObject, opacity: 0.2, backgroundColor: 'black' },
  opacityNone: { ...StyleSheet.absoluteFillObject },
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: '#0c0d34',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderTopLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
});

const Cart = () => {
  const dispatch = useDispatch();
  const { number, products, priceTotal } = useSelector(
    (state: ApplicationState) => state.cartReducer
  );
  const { user, isLogin } = useSelector((state: ApplicationState) => state.userReducer);
  const [opacity, setOpacity] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numberCart, setNumberCart] = useState(0);
  const [cart, setCart] = useState<any>(null);
  // const [products, setProducts] = useState<CartItemProps[]>([]);
  const [userID, setUserID] = useState<string>('');
  const [change, setChange] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [local, setLocal] = useState<any>();
  const sheetRef = React.useRef(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const citys = [];
  const districts = [];
  const wards = [];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [street, setStreet] = useState('');
  const [city, setcity] = useState('');
  const [citySS, setCitySS] = useState([]);
  const [district, setdistrict] = useState('');
  const [districtSS, setdistrictSS] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [ward, setward] = useState('');
  const [wardSS, setwardSS] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataDistrict, setDataDistrict] = useState([]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [dataWard, setDataWard] = useState([]);
  const [phone, setPhone] = useState<string>('');
  const [more, setMore] = useState<string>('');
  const [fullAddress, setFullAddress] = useState('');
  const [valueSlider, setValueSlider] = useState(0);

  const [shipCost, setShipCost] = useState<number>(20);

  useEffect(() => {
    console.log('asd', priceTotal);

    (async () => {
      await dispatch(checkCart());
      sheetRef.current.snapTo(2);
      setOpacity(false);
      // const data = await CartUserService();
      // setCart(data);
      setUserID(user._id);
      // setProducts(data.products);
      updatePrice();
      Axios.get(
        'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/json/all.json?fbclid=IwAR1w-im9SAHPHEpLXTZMAv1FLKIQTutU1IbhMA3NJF3MV0HP3CJoBNxTH08'
      ).then((res) => {
        res.data.map((value) => {
          citys.push(value.name);
        });
        setCitySS(citys);

        setLocal(res.data);
      });
    })();
  }, [change, number, totalPrice]);
  const handIncreased = async (productId: string, quantity: number) => {
    const itemIndex = products.findIndex((p) => p.productId === productId);

    await dispatch(
      AddToCartServiceRedux(
        userID,
        productId,
        quantity,
        products[itemIndex].name,
        products[itemIndex].price,
        products[itemIndex].pictureItem
      )
    );
    updatePrice();
  };
  const updatePrice = () => {
    var total = products.reduce((total, product) => {
      return total + product.quantity * product.price;
    }, 0);
    if (total > 1500) {
      setTotalPrice(total);
      setShipCost(0);
    } else {
      setTotalPrice(total + (total === 0 ? 0 : 20));
      setShipCost(20);
    }
  };
  const handleChangeCity = (value) => {
    setdistrict('');
    setward('');
    setFullAddress(value);
    setcity(value);
    local.map((valuex) => {
      if (value === valuex.name) {
        valuex.huyen.map((district) => {
          districts.push(district.name);
        });
        setdistrictSS(districts);
        setwardSS([]);
      }
    });
    setDataDistrict(districts);
  };

  const handleChangeDistrict = (value) => {
    setward('');
    setdistrict(value);
    setFullAddress(value + ', ' + city);
    local.map((valuex) => {
      if (city === valuex.name) {
        valuex.huyen.map((huyen) => {
          if (huyen.name === value) {
            huyen.xa.map((xa) => {
              wards.push(xa.name);
            });

            setwardSS(wards);
          }
        });
      }
    });

    setDataWard(wards);
  };

  const handleChangeWard = (value) => {
    setward(value);
    setFullAddress(value + ', ' + district + ', ' + city);
  };

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'white',
        padding: 16,
        height: height * 0.9,
      }}>
      <Text>Swipe down to close</Text>
      <Text style={{ fontSize: 12 }}>
        Total: {priceTotal} + {shipCost}(Ship cost){' '}
      </Text>
      <View style={{ backgroundColor: 'white', borderBottomWidth: 1 }}>
        <Box margin="l" flexDirection="row" justifyContent="space-between">
          <TouchableOpacity onPress={() => console.log('aaa')}>
            <Box style={{ justifyContent: 'center' }}>
              <Text variant="titlePrice">{priceTotal + shipCost}</Text>
            </Box>
          </TouchableOpacity>
          <Box>
            <Button
              icon="shopping"
              mode="contained"
              onPress={() => {
                sheetRef.current.snapTo(2);
              }}>
              close
            </Button>
          </Box>
        </Box>
      </View>

      <View>
        <ScrollView>
          <Box
            flexDirection="row"
            style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
            <Box>
              <Text>Name: {user ? user.name : 'Not Login'}</Text>
            </Box>
            <Box style={{ width: (2 * width) / 3 }}>
              <TextInput
                label="Phone"
                mode="outlined"
                value={phone}
                style={{ backgroundColor: 'white' }}
                onChangeText={(text) => setPhone(text)}
              />
            </Box>
          </Box>
          <Box
            flexDirection="row"
            style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
            <Box>
              <Text>City/Province: </Text>
            </Box>
            <Box style={{ width: (2 * width) / 3 }}>
              <RNPickerSelect
                onValueChange={(value) => handleChangeCity(value)}
                items={citySS.map((value) => ({ label: value, value }))}
              />
            </Box>
          </Box>
          <Box
            flexDirection="row"
            style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
            <Box>
              <Text>District: </Text>
            </Box>
            <Box style={{ width: (2 * width) / 3 }}>
              <RNPickerSelect
                onValueChange={(value) => handleChangeDistrict(value)}
                items={districtSS.map((value) => ({ label: value, value }))}
              />
            </Box>
          </Box>
          <Box
            flexDirection="row"
            style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
            <Box>
              <Text>Ward: </Text>
            </Box>
            <Box style={{ width: (2 * width) / 3 }}>
              <RNPickerSelect
                onValueChange={(value) => handleChangeWard(value)}
                items={wardSS.map((value) => ({ label: value, value }))}
              />
            </Box>
          </Box>
          <Box
            flexDirection="row"
            style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
            <Box>
              <Text>More: </Text>
            </Box>
            <Box style={{ width: (2 * width) / 3 }}>
              <TextInput
                label="more"
                multiline
                mode="outlined"
                value={more}
                style={{ backgroundColor: 'white' }}
                onChangeText={(text) => setMore(text)}
              />
            </Box>
          </Box>
          <Box padding="l" alignItems="center" justifyContent="space-evenly">
            <Button
              mode="contained"
              color="red"
              style={{
                borderRadius: 75,
              }}
              contentStyle={{
                width: 200,
                height: 50,
                borderRadius: 75,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              loading={isLoading}
              disabled={phone === '' || district === null || city === null || ward === null}
              onPress={async () => {
                setIsLoading(true);
                await dispatch(
                  buyCart(userID, user.email, fullAddress, phone, more, priceTotal + shipCost)
                );
                await dispatch(checkOrder());
                setIsLoading(true);
              }}>
              <Text>Buy</Text>
            </Button>
          </Box>
        </ScrollView>
      </View>
    </View>
  );
  return (
    <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} enabled>
      <Box flex={1} backgroundColor="white">
        <Header label="Cart" />
        <Box marginTop="m">
          <Box style={{ marginTop: 20, marginLeft: 20, marginRight: 20 }}>
            <Slider
              minimumValue={0}
              disabled
              maximumValue={1500}
              style={{ height: 19 }}
              thumbStyle={{
                borderColor: 'white',
                borderWidth: 3,

                backgroundColor: 'cyan',
              }}
              trackStyle={{ height: 6, borderRadius: 6 }}
              minimumTrackTintColor="cyan"
              maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
              value={priceTotal >= 1500 ? 1500 : priceTotal}
              onValueChange={(value) => setValueSlider(value)}
            />
            <Box justifyContent="center" alignItems="center" margin="s">
              <Text>
                {1500 - priceTotal > 0
                  ? 'Add $ ' + (1500 - priceTotal) + ' to free ship code'
                  : 'FreeShip'}
              </Text>
            </Box>
          </Box>
        </Box>
        <ScrollView style={{ flex: 1.5 }}>
          <View>
            {products ? (
              products.map((product, i) => (
                <CardProductCart onPress={handIncreased} {...{ product }} key={i} />
              ))
            ) : (
              <Text>o</Text>
            )}
          </View>
        </ScrollView>
        <View
          style={{
            backgroundColor: '#0c0d34',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          }}>
          <Box margin="l" flexDirection="row" justifyContent="space-between">
            <TouchableOpacity onPress={() => console.log('aaa')}>
              <Box style={{ justifyContent: 'center', flexDirection: 'row' }}>
                <Text style={{ color: 'white' }}>Total: </Text>
                <Text variant="titlePrice">{priceTotal}</Text>
              </Box>
            </TouchableOpacity>

            <Box>
              <Button
                color="white"
                icon="shopping"
                mode="contained"
                onPress={() => {
                  sheetRef.current.snapTo(0);
                }}>
                Check out
              </Button>
            </Box>
          </Box>
        </View>
        <BottomSheet
          ref={sheetRef}
          enabledContentTapInteraction={false}
          snapPoints={[height * 0.9, 300, 0]}
          borderRadius={10}
          renderContent={renderContent}
          onOpenStart={() => setOpacity(true)}
          onCloseEnd={() => setOpacity(!true)}
        />
        {opacity ? <Box flex={1} style={styles.opacity} /> : <></>}
      </Box>
    </KeyboardAvoidingView>
  );
};
export default Cart;
