/* eslint-disable handle-callback-err */
import Axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Dispatch } from 'react';
import { AsyncStorage } from 'react-native';

import { HOST } from '../../constants/service';

export interface CartModel {
  number: number;
  isCart: boolean;
}
export interface checkCart {
  readonly type: 'ON_CHECKCART';
  payload: any;
}

export type cartIs = checkCart;

export const checkCart = () => {
  return async (dispatch: Dispatch<cartIs>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = await AsyncStorage.getItem('token');
    if (token) {
      Axios.get(HOST + 'carts/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: 'ON_CHECKCART',
            payload: { number: response.data.products.length, isCart: true },
          });
        })
        .catch((err) =>
          dispatch({
            type: 'ON_CHECKCART',
            payload: { number: 0, isCart: !true },
          })
        );
    } else {
      dispatch({
        type: 'ON_CHECKCART',
        payload: { number: 0, isCart: !true },
      });
    }
  };
};
