import React from 'react';
import { View, Text, AsyncStorage } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '../components';
import { ApplicationState } from '../redux';

const Home = () => {
  const { user } = useSelector((state: ApplicationState) => state.userReducer);
  return (
    <View>
      <Text>Home Page</Text>
      <Button
        label="Logout"
        onPress={() => {
          AsyncStorage.removeItem('token');
        }}
      />
      <Text>{user.name}</Text>
    </View>
  );
};
export default Home;
