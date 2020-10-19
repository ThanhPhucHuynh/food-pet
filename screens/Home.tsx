import React, { useEffect } from 'react';
import { View, Text, AsyncStorage, BackHandler, Alert, StyleSheet } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from 'react-redux';

import { BackgroundHome, Button, Header, CardHome } from '../components';
import { Box } from '../constants';
import { StackNavigationProps } from '../navigation';
import { AuthenticationRoutes } from '../navigation/Navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';
export const assets = [];
const Home = ({ navigation }: StackNavigationProps<AuthenticationRoutes, 'Home'>) => {
  const { user, isLogin } = useSelector((state: ApplicationState) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsLogin());

    const backHandler = BackHandler.addEventListener('hardwareBackPress', () => !!user);
    console.log('useEffect Home');

    return () => backHandler.remove();
  }, [isLogin]);
  return (
    <Box flex={1} backgroundColor="white">
      <Header label="Home Pets" />
      <Box flex={1}>
        <BackgroundHome />
        <CardHome position={1} />
        <CardHome position={0.5} />
        <CardHome position={0} />
      </Box>
      {/* <View>
        <Button
          label="Logout"
          onPress={async () => {
            await AsyncStorage.removeItem('token');
            dispatch(checkIsLogin());
          }}
        />

        <Text>{user ? user.name : 'not login'}</Text>
      </View> */}
    </Box>
  );
};
export default Home;
