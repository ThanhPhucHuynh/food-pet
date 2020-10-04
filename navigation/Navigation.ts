/* eslint-disable @typescript-eslint/no-unused-vars */
import { ParamListBase, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
// import { interpolate } from "react-native-reanimated";

export interface StackNavigationProps<
  ParamList extends ParamListBase,
  RouteName extends keyof ParamList = string
> {
  navigation: StackNavigationProp<ParamList, RouteName>;
  route: RouteProp<ParamList, RouteName>;
}

export type Routes = {
  Onboarding: undefined;
  Welcome: undefined;
  Login: undefined;
};
