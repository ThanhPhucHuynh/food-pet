// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cartIs, CartModel } from '../actions/cartAction';

type CartState = {
  number: number;
  isCart: boolean;
  // userId: string;
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
};
const initialState = {
  // userId: '',
  number: 0,
  isCart: false,
  products: null,
  priceTotal: 0,
};

const CartReducer = (state: CartState = initialState, action: cartIs) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'ON_CHECKCART':
      return {
        ...state,
        number: action.payload.number,
        isCart: action.payload.isCart,
        products: action.payload.products,
        priceTotal: action.payload.priceTotal,
      };
    case 'ON_BUYCART':
      return {
        ...state,
        number: action.payload.number,
        isCart: action.payload.isCart,
        products: action.payload.products,
        priceTotal: 0,
      };
    case 'ON_UPDATECART':
      return {
        ...state,
        number: action.payload.number,
        isCart: action.payload.isCart,
        products: action.payload.products,
        priceTotal: action.payload.priceTotal,
      };
    default:
      return state;
  }
};
export { CartReducer };
