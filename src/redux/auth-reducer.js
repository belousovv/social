import { authApi, securityApi } from "../api/api";

const initialState = {
  isAuth: false,
  id: null,
  login: null,
  email: null,
  captcha: null,
};

// actions

const SET_AUTH = "social/auth/SET_AUTH";
const SET_AUTH_DATA = "social/auth/SET_AUTH_DATA";
const SET_CAPTCHA = "social/auth/SET_CAPTCHA";

// action creators

export const setCaptcha = (captcha) => ({ type: SET_CAPTCHA, captcha });
export const setAuth = (state) => ({ type: SET_AUTH, state });
export const setAuthData = (id, login, email) => ({
  type: SET_AUTH_DATA,
  id,
  email,
  login,
});

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CAPTCHA:
      return {
        ...state,
        captcha: action.captcha,
      };
    case SET_AUTH_DATA:
      return {
        ...state,
        id: action.id,
        email: action.email,
        login: action.login,
      };
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.state,
      };
    default:
      return {
        ...state,
      };
  }
};

// thunks

export const getAuth = () => {
  return async (dispatch) => {
    const response = await authApi.getAuth();
    if (response.resultCode === 0) {
      dispatch(setAuth(true));
      dispatch(
        setAuthData(response.data.id, response.data.login, response.data.email)
      );
    } else {
      dispatch(setAuth(false));
    }
  };
};
export const login = (email, password, rememberMe, captcha) => {
  return async (dispatch) => {
    const response = await authApi.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
      dispatch(getAuth());
    } else if (response.resultCode === 10) {
      dispatch(getCaptcha());
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    const response = await authApi.logout();
    if (response.resultCode === 0) {
      dispatch(getAuth());
    }
  };
};

export const getCaptcha = () => {
  return async (dispatch) => {
    const response = await securityApi.getCaptcha();
    if (response) {
      dispatch(setCaptcha(response.url));
    }
  };
};

export default authReducer;
