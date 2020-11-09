import Axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import {
  AsyncStorage,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';

// import {}
import { Button } from '../components';
import { Box, pictureWelcome, Text, width } from '../constants/';
import { HOST } from '../constants/service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { AuthenticationRoutes, StackNavigationProps } from '../navigation/Navigation';
import { ApplicationState, checkIsLogin } from '../redux';
import Login from './Login';
interface WelcomeProps {}
const onPressA = () => {
  console.log('hello');
};
const styles = StyleSheet.create({
  underlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
  },
  picture: {
    ...StyleSheet.absoluteFillObject,
    width: undefined,
    height: undefined,
    borderBottomRightRadius: 55,
  },
});
export const assets = [pictureWelcome];
const Forgot = ({ navigation }: StackNavigationProps<AuthenticationRoutes, 'Welcome'>) => {
  const [code, setCode] = useState<string>('');
  const [codeType, setCodeType] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const [valid, setValid] = useState<boolean>(false);

  useEffect(() => {}, []);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior="height">
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
            <Text variant="title2">Code: {code}</Text>
            <Text paddingHorizontal="xl" textAlign="center" variant="body">
              Code sent by Email
            </Text>
            <Box style={{ width }}>
              <TextInput
                mode="outlined"
                style={{ color: 'white', backgroundColor: 'white', margin: 10 }}
                underlineColor="silver"
                label={valid ? 'new password' : code !== '' ? 'Code' : 'Email'}
                value={valid ? password : code === '' ? email : codeType}
                selectionColor="white"
                onChangeText={(text) => {
                  if (code === '') {
                    setEmail(text);
                  }
                  if (valid) {
                    setPassword(text);
                  } else {
                    setCodeType(text);
                  }
                }}
              />
            </Box>
            <Button
              onPress={() => {
                if (valid && password !== '') {
                  Axios.post(HOST + 'users/change/password', { email, password }).then((res) => {
                    navigation.navigate('Login');
                  });
                }
                if (code === '') {
                  Axios.get(HOST + 'users/code/email/' + email).then((res) => setCode(res.data));
                } else {
                  if (code === codeType) {
                    setValid(true);
                    console.log(valid);
                  }
                }
              }}
              variant="primary"
              label={code !== '' ? 'type Code' : 'send Code'}
            />
          </Box>
        </Box>
      </Box>
    </KeyboardAvoidingView>
  );
};
export default Forgot;
