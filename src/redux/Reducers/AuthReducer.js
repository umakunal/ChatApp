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

    default:
      return state;
  }
};
