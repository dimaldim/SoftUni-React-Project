import {
  LOADING_SCREEN,
  LOGIN_FAILURE,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGOUT_FAILURE,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  VERIFY_REQUEST,
  VERIFY_SUCCESS,
} from '../actions/';

export default (
  state = {
    isLoading: false,
    isLoggingIn: false,
    isLoggingOut: false,
    isVerifying: false,
    loginError: false,
    registration: {},
    logoutError: false,
    isAuthenticated: false,
    user: {},
  },
  action,
) =>
{
  switch (action.type)
  {
    case REGISTER_FAILURE:
      return {
        ...state,
        registration: action.error,
        isLoading: false,
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
        isLoading: true,
        loginError: false,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isLoggingIn: false,
        isLoading: false,
        isAuthenticated: true,
        user: action.user,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
        isLoading: false,
        isAuthenticated: false,
        loginError: true,
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        isLoggingOut: true,
        isLoading: true,
        logoutError: false,
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isLoggingOut: false,
        isLoading: false,
        isAuthenticated: false,
        user: {},
      };
    case LOGOUT_FAILURE:
      return {
        ...state,
        isLoggingOut: false,
        isLoading: false,
        logoutError: true,
      };
    case VERIFY_REQUEST:
      return {
        ...state,
        isVerifying: true,
        verifyingError: false,
      };
    case VERIFY_SUCCESS:
      return {
        ...state,
        isVerifying: false,
      };
    case LOADING_SCREEN:
      return {
        ...state,
        isLoading: action.param,
      };
    default:
      return state;
  }
};
