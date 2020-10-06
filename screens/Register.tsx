import React from 'react';
import { Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';

import { Container, AssetContainer, Button } from '../components';
import { SocialLogin } from '../components/Login';
import { Box, Text } from '../constants';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, StackNavigationProps } from '../navigation/Navigation';
export const RegisterAsset = AssetContainer;
const Register = ({ navigation }: StackNavigationProps<Routes, 'Login'>) => {
  const [textEmail, setTextEmail] = React.useState('');
  const [textPassword, setTextPassword] = React.useState('');
  const [textPasswordTwo, setTextPasswordTwo] = React.useState('');
  const footer = (
    <>
      <SocialLogin />
      <Box alignItems="center">
        <Button
          label="LoginFooter"
          onPress={() => {
            navigation.navigate('Login');
          }}
          variant="transparent">
          <Box flexDirection="row">
            <Text style={{ marginRight: 5 }} variant="titleButton" color="white">
              You're have an account?
            </Text>
            <Text variant="titleButton" color="primary">
              Login here
            </Text>
          </Box>
        </Button>
      </Box>
    </>
  );

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
      <ScrollView>
        <Container isRegister {...{ footer }}>
          <Box padding="xl">
            <Text variant="title1">Welcome to register</Text>
          </Box>
          <Box padding="m">
            <Box padding="s">
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
              <TextInput
                secureTextEntry
                mode="outlined"
                style={{ color: 'white', backgroundColor: 'white' }}
                underlineColor="silver"
                label="Password"
                value={textPassword}
                selectionColor="white"
                onChangeText={(text) => setTextPassword(text)}
              />
            </Box>
            <Box padding="s">
              <TextInput
                mode="outlined"
                secureTextEntry
                style={{ color: 'white', backgroundColor: 'white' }}
                underlineColor="silver"
                label="Password again"
                value={textPasswordTwo}
                selectionColor="white"
                onChangeText={(text) => setTextPasswordTwo(text)}
                onFocus={() => {}}
              />
            </Box>
          </Box>
          <Box padding="l" alignItems="center" justifyContent="space-evenly">
            <Button
              onPress={() => {
                navigation.navigate('Welcome');
              }}
              variant="primary"
              label="Register"
            />
          </Box>
        </Container>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Register;
