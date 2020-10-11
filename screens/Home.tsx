import React, { useEffect } from 'react';
import { View, Text, AsyncStorage } from 'react-native';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../components';
import { StackNavigationProps } from '../navigation';
import { AuthenticationRoutes } from '../navigation/Navigation';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ApplicationState, checkIsLogin } from '../redux';

const Home = ({ navigation }: StackNavigationProps<AuthenticationRoutes, 'Home'>) => {
  const { user } = useSelector((state: ApplicationState) => state.userReducer);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkIsLogin());
  }, []);
  return (
    <View>
      <Text>Home Page</Text>
      <Button
        label="Logout"
        onPress={async () => {
          await AsyncStorage.removeItem('token');
          dispatch(checkIsLogin());
        }}
      />
      {/* <Button
        label="Logout"
        onPress={async () => {
          navigation.navigate('Login');
        }}
      /> */}
      <Text>{user ? user.name : 'not login'}</Text>
    </View>
  );
};
export default Home;
