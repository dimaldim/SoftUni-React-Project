import { myFirebase } from '../firebase/firebase';

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

export const REGISTER_FAILURE = 'REGISTER_FAILURE';

export const VERIFY_REQUEST = 'VERIFY_REQUEST';
export const VERIFY_SUCCESS = 'VERIFY_SUCCESS';

export const LOADING_SCREEN = 'LOADING_SCREEN';

const requestLogin = () =>
{
  return {
    type: LOGIN_REQUEST,
  };
};

const receiveLogin = user =>
{
  return {
    type: LOGIN_SUCCESS,
    user,
  };
};

const registerError = error =>
{
  return {
    type: REGISTER_FAILURE,
    error,
  };
};

const loginError = () =>
{
  return {
    type: LOGIN_FAILURE,
  };
};

const requestLogout = () =>
{
  return {
    type: LOGOUT_REQUEST,
  };
};

const receiveLogout = () =>
{
  return {
    type: LOGOUT_SUCCESS,
  };
};

const logoutError = () =>
{
  return {
    type: LOGOUT_FAILURE,
  };
};

const verifyRequest = () =>
{
  return {
    type: VERIFY_REQUEST,
  };
};

const verifySuccess = () =>
{
  return {
    type: VERIFY_SUCCESS,
  };
};

const loading = param =>
{
  return {
    type: LOADING_SCREEN,
    param,
  };
};


export const loginUser = (email, password) => dispatch =>
{
  dispatch(requestLogin());
  myFirebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user =>
    {
      dispatch(receiveLogin(user));
    })
    .catch(error =>
    {
      //Do something with the error if you want!
      dispatch(loginError());
    });
};

export const logoutUser = () => dispatch =>
{
  dispatch(requestLogout());
  myFirebase
    .auth()
    .signOut()
    .then(() =>
    {
      dispatch(receiveLogout());
    })
    .catch(error =>
    {
      //Do something with the error if you want!
      dispatch(logoutError());
    });
};

export const verifyAuth = () => dispatch =>
{
  dispatch(verifyRequest());
  myFirebase
    .auth()
    .onAuthStateChanged(user =>
    {
      if (user !== null)
      {
        dispatch(receiveLogin(user));
      }
      dispatch(verifySuccess());
    });
};

export const registerUser = (email, password) => dispatch =>
{
  myFirebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user =>
    {
      dispatch(receiveLogin(user));
    })
    .catch(error =>
    {
      dispatch(registerError(error));
    });
};

export const doLoading = (param) => dispatch =>
{
  dispatch(loading(param));
};
