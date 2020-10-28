import { Fontisto } from '@expo/vector-icons';
import { backgroundColor } from '@shopify/restyle';
import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Picker } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Button, Divider, IconButton, List, TextInput } from 'react-native-paper';
import { Icon } from 'react-native-paper/lib/typescript/src/components/Avatar/Avatar';
import RNPickerSelect from 'react-native-picker-select';
import ScrollBottomSheet from 'react-native-scroll-bottom-sheet';
import Slider from 'react-native-slider';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useSelector, useDispatch } from 'react-redux';
import BottomSheet from 'reanimated-bottom-sheet';

import { CardProductCart, CheckButton, Header } from '../components';
import { Box, height, Text, width } from '../constants';
import { AddToCartService, CartUserService } from '../constants/service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkCart, checkIsLogin } from '../redux';
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
});

const Cart = () => {
  const dispatch = useDispatch();
  const { number } = useSelector((state: ApplicationState) => state.cartReducer);
  const { user, isLogin } = useSelector((state: ApplicationState) => state.userReducer);

  const [opacity, setOpacity] = useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [numberCart, setNumberCart] = useState(0);

  const [cart, setCart] = useState<any>(null);
  const [products, setProducts] = useState<CartItemProps[]>([]);
  const [userID, setUserID] = useState<string>('');
  const [change, setChange] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [local, setLocal] = useState<any>();
  const sheetRef = React.useRef(null);

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
  useEffect(() => {
    (async () => {
      dispatch(checkCart());
      sheetRef.current.snapTo(2);
      const data = await CartUserService();
      setCart(data);
      setUserID(data.userId);
      setProducts(data.products);
      setTotalPrice(
        data.products.reduce((total, product) => {
          // console.log(total);
          return total + product.quantity * product.price;
        }, 0)
      );
      Axios.get(
        'https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/json/all.json?fbclid=IwAR1w-im9SAHPHEpLXTZMAv1FLKIQTutU1IbhMA3NJF3MV0HP3CJoBNxTH08'
      ).then((res) => {
        console.log(res.data);

        res.data.map((value) => {
          citys.push(value.name);
        });
        setCitySS(citys);

        setLocal(res.data);
      });
    })();
  }, [change, number]);
  const handIncreased = async (productId: string, quantity: number) => {
    const itemIndex = products.findIndex((p) => p.productId === productId);

    await AddToCartService(
      userID,
      productId,
      quantity,
      products[itemIndex].name,
      products[itemIndex].price,
      products[itemIndex].pictureItem
    );
    setChange(!change);
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
    console.log(value);

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
      <Text style={{ fontSize: 12 }}>Total: {totalPrice} + 20(Ship cost) </Text>
      <View style={{ backgroundColor: 'white', borderBottomWidth: 1 }}>
        <Box margin="l" flexDirection="row" justifyContent="space-between">
          <TouchableOpacity onPress={() => console.log('aaa')}>
            <Box style={{ justifyContent: 'center' }}>
              <Text variant="titlePrice">{totalPrice + 20}</Text>
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
      <Slider
        minimumValue={0}
        maximumValue={5000}
        style={{ height: 19 }}
        thumbStyle={{
          borderColor: 'white',
          borderWidth: 3,
          backgroundColor: 'cyan',
        }}
        trackStyle={{ height: 6, borderRadius: 6 }}
        minimumTrackTintColor="cyan"
        maximumTrackTintColor="rgba(157, 163, 180, 0.10)"
        value={valueSlider}
        onValueChange={(value) => setValueSlider(value)}
      />
      <View>
        <ScrollView>
          <Box
            flexDirection="row"
            style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
            <Box>
              <Text>Name: {user.name}</Text>
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
          {/* <Box
            flexDirection="row"
            style={{ justifyContent: 'space-around', alignItems: 'center', margin: 10 }}>
            <Box>
              <Text>fullAddress: {fullAddress}</Text>
            </Box>
          </Box> */}
          <Box
            flexDirection="row"
            style={{ justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>
            <Box>
              <Fontisto name="discover" size={24} color="black" />
            </Box>
            <Box style={{ width: (2 * width) / 3 }}>
              <TextInput
                label="discount"
                mode="flat"
                value={more}
                style={{ backgroundColor: 'white' }}
                onChangeText={(text) => setMore(text)}
              />
            </Box>
          </Box>
        </ScrollView>
      </View>
    </View>
  );
  return (
    <Box flex={1} backgroundColor="white">
      <Box flex={1} style={opacity ? styles.opacity : styles.opacityNone} />
      <Header label="Cart" />

      <ScrollView>
        <View>
          {cart !== null ? (
            cart.products.map((product, i) => (
              <CardProductCart onPress={handIncreased} {...{ product }} key={i} />
            ))
          ) : (
            <Text>o</Text>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        }}>
        <Box margin="l" flexDirection="row" justifyContent="space-between">
          <TouchableOpacity onPress={() => console.log('aaa')}>
            <Box style={{ justifyContent: 'center', flexDirection: 'row' }}>
              <Text>Total: </Text>
              <Text variant="titlePrice">{totalPrice}</Text>
            </Box>
          </TouchableOpacity>

          <Box>
            <Button
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
    </Box>
  );
};
export default Cart;
