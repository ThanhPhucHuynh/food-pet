import axios from 'axios';
import { AsyncStorage } from 'react-native';
export const HOST: string = 'http://10.233.3.31:3000/';

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
export const LogoutService = async () => {
  const token = await AsyncStorage.getItem('token');

  const data = await axios
    .get(HOST + 'users/logout', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then(async (res) => {
      //   console.log(res.data);
      await AsyncStorage.removeItem('token');
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  return data;
};
export const getAllProduct = async (search?: string, filler?: string[]) => {
  const data = await axios
    .get(HOST + 'products/all', {
      params: {
        search,
        filler,
      },
    })
    .then(async (res) => {
      //   console.log(res.data);
      return res.data;
    })
    .catch(function (error) {
      console.log(error);
      return false;
    });
  return data;
};
