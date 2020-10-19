import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from '@shopify/restyle';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
// eslint-disable-next-line import/order
import { SafeAreaProvider } from 'react-native-safe-area-context';

// import Component,page

import { Provider } from 'react-redux';

import { LoadAssets, OnboardingAssets } from './components/';
import { fonts, theme } from './constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HomeRoutes, AuthenticationNavigator, HomeNavigator } from './navigation';
import { store } from './redux';
import { WelcomeAssets, LoginAsset, RegisterAsset, DrawerAssets } from './screens';
//redux
//import font,theme
const assets = [
  ...OnboardingAssets,
  ...WelcomeAssets,
  ...LoginAsset,
  ...RegisterAsset,
  ...DrawerAssets,
];

const AppStack = createStackNavigator<HomeRoutes>();

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <ThemeProvider theme={theme}>
          <LoadAssets {...{ fonts, assets }}>
            <SafeAreaProvider>
              <AppStack.Navigator headerMode="none">
                <AppStack.Screen name="Authentication" component={AuthenticationNavigator} />
                <AppStack.Screen name="Home" component={HomeNavigator} />
              </AppStack.Navigator>
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
