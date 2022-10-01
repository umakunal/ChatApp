import auth from '@react-native-firebase/auth';
import fireStore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NAVIGATION} from '../../constants/navigation';
import TYPES from '../ActionTypes/index';
import store from '../Store/store';

const {dispatch} = store;

const loginUserRequest = () => ({
  type: TYPES.LOGIN_REQUEST,
  payload: null,
});

const loginUserSuccess = details => ({
  type: TYPES.LOGIN_SUCCESS,
  payload: details,
});

const loginUserError = error => ({
  type: TYPES.LOGIN_ERROR,
  payload: {error},
});
const registerUserRequest = () => ({
  type: TYPES.REGISTER_REQUEST,
  payload: null,
});

const registerUserSuccess = details => ({
  type: TYPES.REGISTER_SUCCESS,
  payload: details,
});

const registerUserError = error => ({
  type: TYPES.REGISTER_ERROR,
  payload: {error},
});

// export const loginUser = (dispatch, data, navigate) => {
export const loginUser = async (data, navigate) => {
  try {
    dispatch(loginUserRequest());
    let userData;
    const isUserLogin = await auth().signInWithEmailAndPassword(
      data.email,
      data.password,
    );
    const email = isUserLogin.user.email;
    const userId = isUserLogin.user.uid;
    userData = {
      email,
      userId,
    };
    dispatch(loginUserSuccess(userData));
  } catch (error) {
    dispatch(loginUserError(error));
    console.log('Error ocurred==>', error);
  }
};
// export const registerUser = (dispatch, data, navigate) => {
export const registerUser = (data, navigate) => {
  try {
    dispatch(registerUserRequest());
    const result = auth().createUserWithEmailAndPassword(Email, Password);

    fireStore().collection('users').doc(result.user).set({
      firsname: FirstName,
      lastname: LastName,
      email: Email,
      password: Password,
    });

    console.log('Firebase Auth Response', result);
    dispatch(registerUserSuccess(result));
    // navigate(NAVIGATION.home);
  } catch (error) {
    dispatch(registerUserError(error));
    console.log('Error ocurred==>', error);
  }
};
