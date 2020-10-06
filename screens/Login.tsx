import { useHeaderHeight, Header } from '@react-navigation/stack';
import React from 'react';
import { Image, KeyboardAvoidingView, Platform } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import { Container, AssetContainer, Button } from '../components';
import { SocialLogin } from '../components/Login';
import { Box, Text, theme } from '../constants';
import { Routes, StackNavigationProps } from '../navigation/Navigation';
export const LoginAsset = AssetContainer;
const Login = ({ navigation }: StackNavigationProps<Routes, 'Login'>) => {
  const [textEmail, setTextEmail] = React.useState('');

  const [textPassword, setTextPassword] = React.useState('');

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

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
      <ScrollView>
        <Container {...{ footer }}>
          <Box padding="xl">
            <Text variant="title1">Welcome to login</Text>
          </Box>
          <Box padding="m">
            <Box padding="s">
              {textEmail === '' ? (
                <Text>Email</Text>
              ) : (
                <Image source={require('../assets/icon/dog.png')} />
              )}
              <TextInput
                mode="outlined"
                style={{ color: 'white', backgroundColor: 'white' }}
                underlineColor="silver"
                label="Email"
                value={textEmail}
                selectionColor="white"
                onChangeText={(text) => setTextEmail(text)}
                onFocus={() => {}}
              />
            </Box>
            <Box padding="s">
              <Text>Password</Text>
              <TextInput
                mode="outlined"
                style={{ color: 'white', backgroundColor: 'white' }}
                underlineColor="silver"
                label="Password"
                value={textPassword}
                selectionColor="white"
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
              label="Login"
            />
          </Box>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Login;
