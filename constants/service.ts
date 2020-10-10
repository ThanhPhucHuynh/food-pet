import axios from 'axios';
import { AsyncStorage } from 'react-native';
export const HOST: string = 'http://192.168.3.108:3000/';

interface LoginServiceProps {
  account: string;
  password: string;
}

export const LoginService = async (account: string, password: string) => {
  const data = await axios
    .post(HOST + 'users/login', { email: account, password })
    .then((res) => {
      //   console.log(res.data);
      AsyncStorage.setItem('token', res.data.token);
      return res.data;
    })
    .catch(function (error) {
      //   console.log(error);
      return error;
    });
  return data;
};
