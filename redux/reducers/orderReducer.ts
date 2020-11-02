// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { orderIs, OrderModel } from '../actions/orderAction';

type OrderState = [
  {
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
    createdAt: Date;
  }
];
const initialState = [
  {
    userId: '',
    address: '',
    phone: '',
    more: '',
    products: null,
    price: 0,
    status: 0,
  },
];

const OrderReducer = (state: OrderState = null, action: orderIs) => {
  // console.log(action.payload);
  switch (action.type) {
    case 'ON_CHECKORDER':
      return {
        ...state,
        orders: action.payload.orders,
      };

    default:
      return state;
  }
};
export { OrderReducer };
