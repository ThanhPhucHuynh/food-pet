import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { enableScreens } from 'react-native-screens';
import { FluidNavigator } from 'react-navigation-fluid-transitions';
import { createSharedElementStackNavigator } from 'react-navigation-shared-element';

import { Detail, Login, Onboarding, Product, Register, Welcome } from '../screens';
import { AuthenticationRoutes, AuthenticationRoutesProduct } from './Navigation';
export const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();
export const AuthenticationStackProduct1 = createStackNavigator<AuthenticationRoutesProduct>();
enableScreens();
export const AuthenticationStackProduct = createSharedElementStackNavigator();

export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="Register" component={Register} />
      {/* <AuthenticationStack.Screen name="Detail" component={Detail} /> */}

      {/* <AuthenticationStack.Screen name="Product" component={Product} /> */}
      {/* <AuthenticationStack.Screen name="Home" component={Home} /> */}
    </AuthenticationStack.Navigator>
  );
};

export const AuthenticationNavigatorProduct = () => {
  return (
    <AuthenticationStackProduct.Navigator headerMode="none" initialRouteName="Product">
      <AuthenticationStackProduct.Screen name="Product" component={Product} />
      <AuthenticationStackProduct.Screen
        name="Detail"
        component={Detail}
        sharedElementsConfig={(route, otherRoute, showing) => {
          const { product } = route.params;
          return [{ id: `item.${product._id}.photo`, animation: 'move' }];
        }}
        options={() => ({
          gestureEnabled: false,

          cardStyleInterpolator: ({ current: { progress } }) => {
            return { cardStyle: { opacity: progress } };
          },
          cardStyle: {
            backgroundColor: 'transparent',
          },
        })}
      />
    </AuthenticationStackProduct.Navigator>
  );
};
