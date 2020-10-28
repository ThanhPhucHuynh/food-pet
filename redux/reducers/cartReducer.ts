// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { cartIs, CartModel } from '../actions/cartAction';

type CartState = {
  number: number;
  isCart: boolean;
};
const initialState = {
  number: 0,
  isCart: false,
};

const CartReducer = (state: CartState = initialState, action: cartIs) => {
  switch (action.type) {
    case 'ON_CHECKCART':
      return {
        ...state,
        number: action.payload.number,
        isCart: action.payload.isCart,
      };
    default:
      return state;
  }
};
export { CartReducer };
