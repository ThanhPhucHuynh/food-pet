// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { userIsLogin, UserModel } from '../actions/userAction';

type UserState = {
  user: UserModel;
  isLogin: boolean;
};
const initialState = {
  user: {} as UserModel,
  isLogin: undefined,
};

const UserReducer = (state: UserState = initialState, action: userIsLogin) => {
  switch (action.type) {
    case 'ON_CHECKLOGIN':
      return {
        ...state,
        user: action.payload,
        isLogin: true,
      };
    case 'ON_CHECKLOGINERR':
      return {
        ...state,
        error: action.payload,
        isLogin: false,
        user: null,
      };
    default:
      return state;
  }
};
export { UserReducer };
