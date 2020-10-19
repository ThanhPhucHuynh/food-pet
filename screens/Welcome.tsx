import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { AsyncStorage, Image, StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

// import {}
import { Button } from '../components';
import { Box, pictureWelcome, Text } from '../constants/';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthenticationRoutes, StackNavigationProps } from '../navigation/Navigation';
import { ApplicationState, checkIsLogin } from '../redux';
interface WelcomeProps {}
const onPressA = () => {
  console.log('hello');
};
const styles = StyleSheet.create({
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    // borderBottomRightRadius: 55,
    // backgroundColor: 'white',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: 55,
    // borderBottomLeftRadius: 55,
  },
});
export const assets = [pictureWelcome];
const Welcome = ({ navigation }: StackNavigationProps<AuthenticationRoutes, 'Welcome'>) => {
  const dispatch = useDispatch();
  const userIs = useSelector((state: ApplicationState) => state.userReducer);
  useEffect(() => {
    dispatch(checkIsLogin());
    if (userIs.isLogin) {
      navigation.navigate('Home');
    }
  }, [userIs.isLogin]);
  // console.log(userIs);

  return (
    <Box flex={1} backgroundColor="white">
      <StatusBar style="auto" />
      <Box
        flex={1}
        style={{ borderBottomRightRadius: 55 }}
        borderBottomRightRadius="xl"
        backgroundColor="grey"
        alignItems="center"
        justifyContent="flex-end">
        <View style={styles.underlay}>
          <Image source={pictureWelcome} style={styles.picture} />
        </View>
      </Box>
      <Box flex={1} borderBottomRightRadius="xl">
        <Box backgroundColor="grey" position="absolute" top={0} left={0} right={0} bottom={0} />
        <Box
          backgroundColor="white"
          borderTopLeftRadius="xl"
          flex={1}
          padding="l"
          alignItems="center"
          justifyContent="space-evenly">
          <Text variant="title2">Let's get started</Text>
          <Text paddingHorizontal="xl" textAlign="center" variant="body">
            Login to your account below or sign up for amazing experience
          </Text>
          <Button
            onPress={() => {
              navigation.navigate('Login');
            }}
            variant="primary"
            label="Have an account? Login"
          />
          <Button
            label="Join us"
            onPress={() => {
              navigation.navigate('Home');
            }}
          />
          <Button onPress={onPressA} variant="transparent" label="Forgot password?" />
        </Box>
      </Box>
    </Box>
  );
};
export default Welcome;
