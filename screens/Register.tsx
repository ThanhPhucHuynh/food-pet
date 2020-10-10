import axios from 'axios';
import Constants from 'expo-constants';
import * as ImagePicker from 'expo-image-picker';
import React from 'react';
import { AsyncStorage, Image, KeyboardAvoidingView, Platform, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, TextInput } from 'react-native-paper';

import { Container, AssetContainer, Button } from '../components';
import { SocialLogin } from '../components/Login';
import { Box, Text } from '../constants';
import { HOST } from '../constants/service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Routes, StackNavigationProps } from '../navigation/Navigation';

interface ImageInfo {
  uri: string;
  name: string;
  type: string;
}

export const RegisterAsset = AssetContainer;

const Register = ({ navigation }: StackNavigationProps<Routes, 'Login'>) => {
  const [textEmail, setTextEmail] = React.useState('');
  const [textName, setTextName] = React.useState('');

  const [textPassword, setTextPassword] = React.useState('');
  const [textPasswordTwo, setTextPasswordTwo] = React.useState('');
  const [image, setImage] = React.useState<any>(null);
  const [imageForm, setImageForm] = React.useState<any>(null);
  React.useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);
  const Register = async () => {
    const localUri = imageForm.uri;
    const filename = localUri.split('/').pop();
    // Infer the type of the image
    const match = /\.(\w+)$/.exec(filename);
    const type = match ? `image/${match[1]}` : `image`;
    const formData = new FormData();
    const dataPicture = JSON.parse(JSON.stringify({ uri: localUri, name: filename, type }));
    const user = JSON.parse(
      JSON.stringify({
        email: textEmail,
        name: textName,
        password: textPassword,
      })
    );
    formData.append('photo', dataPicture);
    formData.append('name', textName);
    formData.append('email', textEmail);
    formData.append('password', textPassword);

    const config = { headers: { 'Content-Type': 'multipart/form-data' } };
    console.log(HOST + 'users/register');

    axios
      .post(HOST + 'users/register', formData, config)
      .then(function (response) {
        AsyncStorage.setItem('token', response.data.token);
        console.log(response.data.token);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    // console.log('result: tphuc---', result);

    if (result.cancelled === false) {
      setImage(result.uri);
      setImageForm(result);
    }
  };

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
        <Container isRegister {...{ footer, image }}>
          <Box padding="s" flexDirection="row" justifyContent="flex-start">
            <Box justifyContent="center" alignItems="center">
              <Text variant="title1" marginLeft="m" textAlign="center">
                Welcome to register
              </Text>
            </Box>
          </Box>
          <Box padding="m">
            <Box padding="s">
              <TextInput
                mode="outlined"
                style={{ color: 'white', backgroundColor: 'white' }}
                underlineColor="silver"
                label="Name"
                value={textName}
                selectionColor="white"
                onChangeText={(text) => setTextName(text)}
                onFocus={() => {}}
              />
            </Box>
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
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Button label="Pick an image from camera roll" onPress={pickImage} />
            {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}
          </View>
          <Box padding="l" alignItems="center" justifyContent="space-evenly">
            <Button
              onPress={() => {
                // navigation.navigate('Welcome');
                Register();
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
