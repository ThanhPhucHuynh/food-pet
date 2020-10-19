import axios from 'axios';
import { AsyncStorage } from 'react-native';
export const HOST: string = 'http://10.233.2.196:3000/';

interface LoginServiceProps {
  account: string;
  password: string;
}

export const LoginService = async (account: string, password: string) => {
  const data = await axios
    .post(HOST + 'users/login', { email: account, password })
    .then(async (res) => {
      //   console.log(res.data);
      await AsyncStorage.setItem('token', res.data.token);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  return data;
};
