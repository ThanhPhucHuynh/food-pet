import { MaterialCommunityIcons } from '@expo/vector-icons';
import { DrawerItemList } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Avatar } from 'react-native-paper';

import { DrawerItem } from '../components';
import { AvatarGuest, Box, height, Text, DrawnItemList, ButtonPicture, width } from '../constants';
import { HOST } from '../constants/service';

export const assets = [AvatarGuest, ButtonPicture];
interface DrawerScreenProps {
  user?: any;
  isLogin?: boolean;
  onPress?: () => void;
}
const styles = StyleSheet.create({
  underlay: {
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
const DrawerScreen = ({ user, isLogin }: DrawerScreenProps) => {
  const navigation = useNavigation();
  const urlAvatar = !isLogin ? AvatarGuest : { uri: HOST + user.avatar };
  const name = !isLogin ? 'Guest' : user.name;
  const onPress = () => {
    if (!isLogin) {
      navigation.navigate('Login');
    }
  };
  const BtnLogin = () =>
    !isLogin ? (
      <TouchableOpacity {...{ onPress }}>
        <Text variant="name" style={{ textTransform: 'uppercase' }}>
          {name}
        </Text>
      </TouchableOpacity>
    ) : (
      <Box justifyContent="center" alignItems="center">
        <Text variant="name" style={{ textTransform: 'uppercase' }}>
          {name}
        </Text>
        <Text variant="email" style={{ textTransform: 'uppercase' }}>
          {user.email}
        </Text>
      </Box>
    );
  return (
    <Box flex={1}>
      <Box flex={0.2} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderBottomRightRadius="xl"
          backgroundColor="secondary">
          <Box flexDirection="row" justifyContent="space-between" margin="xl">
            <Box>
              <TouchableOpacity
                onPress={() => {
                  navigation.dispatch(DrawerActions.closeDrawer());
                }}>
                <MaterialCommunityIcons name="location-exit" size={24} color="white" />
              </TouchableOpacity>
            </Box>
            <Box>
              <Text variant="titleDraw">MY PROFILE</Text>
            </Box>
            <Box>
              <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
                <MaterialCommunityIcons name="cart" size={24} color="white" />
              </TouchableOpacity>
            </Box>
          </Box>
        </Box>
      </Box>
      <Box flex={0.8}>
        <Box flex={1} backgroundColor="secondary" />
        <Box flex={1} backgroundColor="greenLight">
          <View style={styles.underlay}>
            <Image source={ButtonPicture} style={styles.picture} />
          </View>
        </Box>
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          backgroundColor="white"
          borderTopLeftRadius="xl"
          // marginTop='s'
          justifyContent="center"
          borderBottomRightRadius="xl">
          <Box
            // backgroundColor="red"
            style={{
              marginTop: height * 0.2,
            }}
            justifyContent="center"
            // alignItems="center"
            padding="xl">
            {DrawnItemList.map((item, index) => {
              return item.label === 'Logout' && !isLogin ? (
                <></>
              ) : (
                <DrawerItem key={index} {...item} />
              );
            })}
          </Box>
        </Box>
      </Box>
      <Box flex={0.4} position="absolute" top={height * 0.1} left={0} right={0}>
        <Box justifyContent="center" alignItems="center">
          <Avatar.Image
            size={150}
            source={
              urlAvatar
              // { uri: HOST + urlAvatar }
            }
            style={{
              backgroundColor: 'white',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 12,
              },
              shadowOpacity: 0.58,
              shadowRadius: 16.0,
              elevation: 24,
            }}
          />
          <Box margin="l">
            <BtnLogin />
          </Box>
        </Box>
      </Box>
      <Box flex={0.201} backgroundColor="white">
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          bottom={0}
          borderTopLeftRadius="xl"
          backgroundColor="greenLight">
          <View style={styles.underlay}>
            <Image source={ButtonPicture} style={styles.picture} />
          </View>
        </Box>
      </Box>
    </Box>
  );
};
export default DrawerScreen;
