/* eslint-disable @typescript-eslint/no-unused-vars */
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { CompositeNavigationProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import Constants from 'expo-constants';
import { isLoading } from 'expo-font';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import React, { useRef, useState } from 'react';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Alert, AsyncStorage, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { ActivityIndicator, Colors } from 'react-native-paper';

import { Container, AssetContainer, Button } from '../components';
import { SocialLogin, InputLoginRegister } from '../components/Login';
import { Box, Text } from '../constants';
import { LoginService } from '../constants/service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthenticationRoutes, AuthNavigationProps, HomeRoutes } from '../navigation/Navigation';

interface LoginProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, 'Login'>,
    DrawerNavigationProp<HomeRoutes, 'HomeDraw'>
  >;
}
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
export const LoginAsset = AssetContainer;
const Login = ({ navigation }: AuthNavigationProps<'Login'>) => {
  const [textEmail, setTextEmail] = React.useState('');
  const [textPassword, setTextPassword] = React.useState('');

  const [checkEmail, setCheckEmail] = React.useState<boolean>(true);
  const [checkPassword, setCheckPassword] = React.useState<boolean>(true);
  const [isChange, setIsChange] = React.useState<boolean>(false);
  const [isWrong, setIsWrong] = React.useState<boolean>(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [token, setToken] = React.useState<string>('');
  const [loading, setLoading] = React.useState<boolean>(false);
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  React.useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    (async () => {
      const token_vale = await AsyncStorage.getItem('token');
      // console.log();
    })();
  }, []);

  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button
          label="LoginFooter"
          onPress={() => {
            navigation.navigate('Register');
          }}
          variant="transparent">
          <Box flexDirection="row">
            <Text style={{ marginRight: 2 }} variant="titleButton" color="white">
              Don't have an account?
            </Text>
            <Text variant="titleButton" color="primary">
              Register here
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );
  const validationEmail = () => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(textEmail).toLowerCase());
  };
  const LoadingComponent = () =>
    loading ? <ActivityIndicator animating color={Colors.red800} /> : <Box />;
  return (
    // <ScrollView bounces={!true}>
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
      <ScrollView>
        <Container {...{ footer }}>
          <Box padding="xl" alignItems="center">
            <Text variant="title1">Welcome to login</Text>
            <Text
              style={{ marginTop: 20, marginHorizontal: 30, textAlign: 'center' }}
              variant="title">
              Use your credentials below amd login to your account
            </Text>
          </Box>

          <Text
            style={{ marginTop: 20, marginHorizontal: 30, textAlign: 'center' }}
            variant="error">
            {isWrong ? 'Email or Password incorrect! Again PLS!' : ''}
          </Text>
          <LoadingComponent />
          <Box padding="l">
            <Box padding="s" style={{ justifyContent: 'center' }}>
              <InputLoginRegister
                isChange={isChange}
                label="Enter your Email"
                value={textEmail}
                leftIcon="account"
                error={!checkEmail}
                rightIcon="check-circle"
                check={checkEmail}
                onChangeText={(text) => setTextEmail(text)}
                onBlur={(text) => {
                  // console.log(validationEmail(), textEmail == '');

                  if (validationEmail() || textEmail === '') {
                    setIsChange(false);
                    setCheckEmail(true);
                  } else {
                    setCheckEmail(false);
                    setIsChange(true);
                  }
                }}
              />
            </Box>
            <Box padding="s">
              {/* <Text>Password</Text> */}
              <InputLoginRegister
                secureTextEntry
                isChange={isChange}
                label="Enter your Password"
                value={textPassword}
                leftIcon="lock"
                error={!checkPassword}
                rightIcon="check-circle"
                check={checkPassword}
                onChangeText={(text) => setTextPassword(text)}
              />
            </Box>
          </Box>
          <Box padding="l" alignItems="center" justifyContent="space-evenly">
            <Button
              onPress={async () => {
                setLoading(true);
                const Login = await LoginService(textEmail, textPassword, expoPushToken);
                setIsWrong(!Login);
                setLoading(false);
                if (Login) {
                  navigation.navigate('Home');
                }
              }}
              variant="primary"
              label="Login into your account"
            />
          </Box>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
export default Login;
