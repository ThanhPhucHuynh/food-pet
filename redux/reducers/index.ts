import { combineReducers } from 'redux';

import { CartReducer } from './cartReducer';
import { OrderReducer } from './orderReducer';
import { UserReducer } from './userReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  cartReducer: CartReducer,
  orderReducer: OrderReducer,
  //some more reducer will come
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
