import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {} from '@react-navigation/drawer';
import { StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useSelector, useDispatch } from 'react-redux';

import { Box, Text } from '../constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkCart } from '../redux';
interface HeaderProps {
  label: string;
}
const Header = ({ label }: HeaderProps) => {
  const { number } = useSelector((state: ApplicationState) => state.cartReducer);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [numberCart, setNumberCart] = useState(0);
  const insets = useSafeAreaInsets();
  useEffect(() => {
    (async () => {
      dispatch(checkCart());
      setNumberCart(number);
      console.log('useEffect Header');
    })();
  }, [number]);
  return (
    <Box
      justifyContent="space-around"
      flexDirection="row"
      alignItems="center"
      paddingHorizontal="l"
      style={{ marginTop: insets.top }}>
      <Box>
        <TouchableOpacity
          onPress={() => {
            if (label === 'Detail') {
              navigation.goBack();
            } else navigation.dispatch(DrawerActions.openDrawer());
          }}>
          {label === 'Detail' ? (
            <MaterialIcons name="keyboard-backspace" size={24} color="black" />
          ) : (
            <Entypo name="menu" size={24} color="black" />
          )}
        </TouchableOpacity>
      </Box>
      <Box>
        <Text
          variant="titleHeader"
          style={{
            textTransform: 'uppercase',
          }}>
          {label}
        </Text>
      </Box>
      <Box style={{ height: 26, width: 26 }}>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('CartDraw');
          }}>
          <AntDesign name="shoppingcart" size={24} color="black" />
          <Box
            style={{
              ...StyleSheet.absoluteFillObject,
              opacity: 0.9,
              alignItems: 'flex-end',
            }}>
            <Box
              style={{
                backgroundColor: 'cyan',
                height: 15,
                right: 0,
                top: 0,
                width: 15,
                borderRadius: 7,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text>{numberCart}</Text>
            </Box>
          </Box>
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
export default Header;
