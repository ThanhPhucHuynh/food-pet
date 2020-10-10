import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Provider as PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import Component,page

import { Provider, useSelector, useDispatch } from 'react-redux';

import { LoadAssets, Onboarding, OnboardingAssets } from './components/';
import { fonts, theme } from './constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes } from './navigation/Navigation';
import { ApplicationState, checkIsLogin, store } from './redux';
import {
  Login,
  Welcome,
  WelcomeAssets,
  LoginAsset,
  Register,
  RegisterAsset,
  Home,
} from './screens';
//redux
//import font,theme
const assets = [...OnboardingAssets, ...WelcomeAssets, ...LoginAsset, ...RegisterAsset];
const AuthenticationStack = createStackNavigator<Routes>();
const AuthenticationNavigator = () => {
  return (
    <AuthenticationStack.Navigator headerMode="none">
      <AuthenticationStack.Screen name="Onboarding" component={Onboarding} />
      <AuthenticationStack.Screen name="Welcome" component={Welcome} />
      <AuthenticationStack.Screen name="Login" component={Login} />
      <AuthenticationStack.Screen name="Register" component={Register} />
      <AuthenticationStack.Screen name="Home" component={Home} />
    </AuthenticationStack.Navigator>
  );
};
export default function App() {
  // console.log(fonts);
  // const notes = useSelector((state) => state);
  // const [isLogin,setIsLogin]
  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider theme={theme}>
          <LoadAssets {...{ fonts, assets }}>
            <SafeAreaProvider>
              {/* <KeyboardAvoidingView> */}

              <AuthenticationNavigator />
            </SafeAreaProvider>
          </LoadAssets>
        </ThemeProvider>
      </PaperProvider>
    </Provider>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
    // backgroundColor: 'black',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});
