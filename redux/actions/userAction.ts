import Axios from 'axios';
import { Dispatch } from 'react';
import { AsyncStorage } from 'react-native';

import { HOST } from '../../constants/service';

export interface UserModel {
  name: string;
  email: string;
  avatar: string;
  token: string;
}
export interface checkIsLogin {
  readonly type: 'ON_CHECKLOGIN';
  payload: any;
}
export interface checkIsLoginErr {
  readonly type: 'ON_CHECKLOGINERR';
  payload: any;
}
export type userIsLogin = checkIsLogin | checkIsLoginErr;

export const checkIsLogin = () => {
  return async (dispatch: Dispatch<userIsLogin>) => {
    const response = 'Complete';
    if (await AsyncStorage.getItem('token')) {
      Axios.get(HOST + 'users/me', {
        headers: {
          Authorization: `Bearer ${await AsyncStorage.getItem('token')}`,
        },
      })
        .then((response) => {
          dispatch({ type: 'ON_CHECKLOGIN', payload: response.data });
        })
        .catch((err) => {
          dispatch({
            type: 'ON_CHECKLOGINERR',
            payload: err,
          });
        });
      // if (response) {
      //   dispatch({ type: 'ON_CHECKLOGIN', payload: response });
      // }
    } else {
      dispatch({
        type: 'ON_CHECKLOGINERR',
        payload: 'not Login',
      });
    }
  };
};
