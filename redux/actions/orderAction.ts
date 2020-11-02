/* eslint-disable handle-callback-err */
import Axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Dispatch } from 'react';
import { AsyncStorage } from 'react-native';

import { HOST } from '../../constants/service';

export interface OrderModel {
  userId: string;
  address: string;
  phone: string;
  more: string;
  products: [
    {
      productId: string;
      quantity: number;
      name: string;
      price: number;
      pictureItem: string;
    }
  ];
  price: number;
  status: number;
}
export interface checkOrder {
  readonly type: 'ON_CHECKORDER';
  payload: any;
}

export type orderIs = checkOrder;

export const checkOrder = () => {
  return async (dispatch: Dispatch<orderIs>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = await AsyncStorage.getItem('token');
    if (token) {
      Axios.get(HOST + 'orders/user', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          dispatch({
            type: 'ON_CHECKORDER',
            payload: {
              orders: [...response.data],
            },
          });
        })
        .catch((err) =>
          dispatch({
            type: 'ON_CHECKORDER',
            payload: { orders: [] },
          })
        );
    } else {
      dispatch({
        type: 'ON_CHECKORDER',
        payload: { orders: [] },
      });
    }
  };
};
