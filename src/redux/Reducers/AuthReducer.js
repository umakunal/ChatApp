import TYPES from '../ActionTypes/';

const initialState = {
  userData: {},
  isLoggedIn: false,
  loading: false,
};

export const AuthReducer = (state = initialState, {type, payload}) => {
  switch (type) {
    case TYPES.LOGIN_REQUEST:
      return {...state, loading: true};
    case TYPES.LOGIN_SUCCESS:
      console.log('payload', payload);
      return {...state, loading: false, userData: payload, isLoggedIn: true};
    case TYPES.LOGIN_ERROR:
      return {loading: false};

    case TYPES.REGISTER_REQUEST:
      console.log('register request hit');
      return {...state, loading: true};
    case TYPES.REGISTER_SUCCESS:
      console.log('register success hit');
      console.log('payload', payload);
      return {...state, loading: false, userData: payload, isLoggedIn: true};
    case TYPES.REGISTER_ERROR:
      console.log('register error hit');
      return {loading: false};

    default:
      return state;
  }
};
