/* eslint-disable handle-callback-err */
import Axios from 'axios';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Dispatch } from 'react';
import { AsyncStorage } from 'react-native';
import { Transitioning } from 'react-native-reanimated';

import { HOST } from '../../constants/service';

export interface CartModel {
  number: number;
  isCart: boolean;
  products: [
    {
      productId: string;
      quantity: number;
      name: string;
      price: number;
      pictureItem: string;
    }
  ];
  priceTotal: number;
}
export interface checkCart {
  readonly type: 'ON_CHECKCART';
  payload: any;
}
export interface buyCart {
  readonly type: 'ON_BUYCART';
  payload: any;
}
export interface updateCart {
  readonly type: 'ON_UPDATECART';
  payload: any;
}
export type cartIs = checkCart | buyCart | updateCart;

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
          let priceTotal = 0;
          if (response.data.products) {
            priceTotal = response.data.products.reduce((total, product) => {
              return total + product.quantity * product.price;
            }, 0);
          }
          dispatch({
            type: 'ON_CHECKCART',
            payload: {
              number: response.data.products.length,
              isCart: true,
              products: [...response.data.products],
              priceTotal,
            },
          });
        })
        .catch((err) =>
          dispatch({
            type: 'ON_CHECKCART',
            payload: { number: 0, isCart: !true, products: [] },
          })
        );
    } else {
      dispatch({
        type: 'ON_CHECKCART',
        payload: { number: 0, isCart: !true, products: [] },
      });
    }
  };
};

export const buyCart = (
  userId: string,
  address: string,
  phone: string,
  more: string,
  price: number
) => {
  return async (dispatch: Dispatch<cartIs>) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const token = await AsyncStorage.getItem('token');
    if (token) {
      Axios.post(
        HOST + 'orders/add',
        {
          userId,
          address,
          phone,
          more,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          dispatch({
            type: 'ON_BUYCART',
            payload: { number: 0, isCart: false },
          });
        })
        .catch((err) =>
          dispatch({
            type: 'ON_BUYCART',
            payload: { number: 0, isCart: !true },
          })
        );
    } else {
      dispatch({
        type: 'ON_BUYCART',
        payload: { number: 0, isCart: !true },
      });
    }
  };
};
export const AddToCartServiceRedux = (
  userId: string,
  productId: string,
  quantity: number,
  name: string,
  price: number,
  pictureItem: string
) => {
  return async (dispatch: Dispatch<cartIs>) => {
    const data = await Axios.post(HOST + 'carts/add', {
      userId,
      productId,
      quantity,
      name,
      price,
      pictureItem,
    })
      .then((response) => {
        const priceTotal = response.data.products.reduce((total, product) => {
          return total + product.quantity * product.price;
        }, 0);

        dispatch({
          type: 'ON_UPDATECART',
          payload: {
            number: response.data.products.length,
            isCart: true,
            products: [...response.data.products],
            priceTotal,
          },
        });
      })
      .catch((err) =>
        dispatch({
          type: 'ON_UPDATECART',
          payload: {
            number: 0,
            isCart: !true,
            products: [],
          },
        })
      );
  };
};
