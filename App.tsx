import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { StyleSheet } from 'react-native';

// import Component,page
import { LoadAssets, Onboarding, OnboardingAssets } from './components/';
import { fonts, theme } from './constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes } from './navigation/Navigation';
import { Login, Welcome, WelcomeAssets } from './screens';
//import font,theme
const assets = [...OnboardingAssets, ...WelcomeAssets];
const AuthenticationStack = createStackNavigator<Routes>();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
    </AuthenticationStack.Navigator>
  );
};
export default function App() {
  // console.log(fonts);

  return (
    <ThemeProvider theme={theme}>
      <LoadAssets {...{ fonts, assets }}>
        <AuthenticationNavigator />
      </LoadAssets>
    </ThemeProvider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
