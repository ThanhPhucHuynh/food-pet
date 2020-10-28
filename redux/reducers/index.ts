import { combineReducers } from 'redux';

import { CartReducer } from './cartReducer';
import { UserReducer } from './userReducer';

const rootReducer = combineReducers({
  userReducer: UserReducer,
  cartReducer: CartReducer,
  //some more reducer will come
});

export type ApplicationState = ReturnType<typeof rootReducer>;

export { rootReducer };
