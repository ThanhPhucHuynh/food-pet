import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';

import { Detail, Login, Onboarding, Product, Register, Welcome } from '../screens';
import { AuthenticationRoutes } from './Navigation';
export const AuthenticationStack = createStackNavigator<AuthenticationRoutes>();

export const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="Register" component={Register} />
      <AuthenticationStack.Screen name="Detail" component={Detail} />

      <AuthenticationStack.Screen name="Product" component={Product} />
      {/* <AuthenticationStack.Screen name="Home" component={Home} /> */}
    </AuthenticationStack.Navigator>
  );
};
