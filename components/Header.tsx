import { AntDesign, Entypo, MaterialIcons } from '@expo/vector-icons';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Box, Text } from '../constants';
interface HeaderProps {
  label: string;
}
const Header = ({ label }: HeaderProps) => {
  const navigation = useNavigation();
  const insets = useSafeAreaInsets();
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
      <Box>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Cart');
          }}>
          <AntDesign name="shoppingcart" size={24} color="black" />
        </TouchableOpacity>
      </Box>
    </Box>
  );
};
export default Header;
