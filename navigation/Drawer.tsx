import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Drawer_Width } from '../constants';
import { ApplicationState, checkIsLogin } from '../redux';
import { Cart, Detail, DrawerScreen, Home, Product } from '../screens';
import { AuthenticationNavigatorProduct } from './Authentication';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {
  HomeRoutes,
  AuthenticationRoutes,
  StackNavigationProps,
  AuthNavigationProps,
} from './Navigation';
// Ignore log notification by message

const Drawer = createDrawerNavigator();
export const HomeNavigator = ({ navigation }: AuthNavigationProps<'Home'>) => {
  // console.disableYellowBox = true;

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
  console.disableYellowBox = true;
  return (
    <Drawer.Navigator
      drawerContent={(props) => {
        return (
          <DrawerScreen
            {...props}
            {...{ user, isLogin }}
            key={props.state.routeNames[props.state.index]}
          />
        );
      }}
      drawerStyle={{
        width: Drawer_Width,
      }}>
      <Drawer.Screen name="HomeApp" component={Home} />
      <Drawer.Screen name="ProductStack" component={AuthenticationNavigatorProduct} />
      <Drawer.Screen name="Cart" component={Cart} />
      <Drawer.Screen name="Detail" initialParams={{ _id: '' }} component={Detail} />
    </Drawer.Navigator>
  );
};
export const AppStack = createStackNavigator<HomeRoutes>();
