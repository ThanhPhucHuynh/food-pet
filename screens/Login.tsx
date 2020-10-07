import React from 'react';
import { KeyboardAvoidingView } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { Container, AssetContainer, Button } from '../components';
import { SocialLogin, InputLoginRegister } from '../components/Login';
import { Box, Text } from '../constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, StackNavigationProps } from '../navigation/Navigation';

export const LoginAsset = AssetContainer;
const Login = ({ navigation }: StackNavigationProps<Routes, 'Login'>) => {
  const [textEmail, setTextEmail] = React.useState('');
  const [textPassword, setTextPassword] = React.useState('');

  const [checkEmail, setCheckEmail] = React.useState<boolean>(true);
  const [checkPassword, setCheckPassword] = React.useState<boolean>(true);
  const [isChange, setIsChange] = React.useState<boolean>(false);

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
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(textEmail).toLowerCase());
  };
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
              onPress={() => {
                navigation.navigate('Welcome');
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

export default Login;
