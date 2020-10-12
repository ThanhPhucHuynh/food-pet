/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp, ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import { interpolate } from "react-native-reanimated";

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}
export interface AuthNavigationProps<RouteName extends keyof AuthenticationRoutes> {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, RouteName>,
    DrawerNavigationProp<HomeRoutes, 'HomeApp'>
  >;
  route: RouteProp<AuthenticationRoutes, RouteName>;
}
export type AuthenticationRoutes = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
};
export type HomeRoutes = {
  Authentication: undefined;
  HomeApp: undefined;
  Product: undefined;
  Cart: undefined;
};
