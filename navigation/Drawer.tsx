import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { ApplicationState, checkIsLogin } from '../redux';
import { DrawerScreen, Home, Product } from '../screens';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  HomeRoutes,
  AuthenticationRoutes,
  StackNavigationProps,
  AuthNavigationProps,
} from './Navigation';

const Drawer = createDrawerNavigator();
export const HomeNavigator = ({ navigation }: AuthNavigationProps<'Home'>) => {
  const { user, isLogin } = useSelector((state: ApplicationState) => state.userReducer);
  const [userProps, setUserProps] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    if (isLogin) {
      setUserProps({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
      });
    }
  }, []);
  const DrawerContent = () => {
    if (isLogin) {
      return <DrawerScreen {...{ user }} isLogin={isLogin} />;
    } else {
      return (
        <DrawerScreen
          {...{ user }}
          isLogin={isLogin}
          onPress={() => {
            navigation.navigate('Login');
          }}
        />
      );
    }
  };
  return (
    <Drawer.Navigator drawerContent={DrawerContent}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="Product" component={Product} />
    </Drawer.Navigator>
  );
};
export const AppStack = createStackNavigator<HomeRoutes>();
