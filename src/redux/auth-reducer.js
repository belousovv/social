import { authApi, profileApi, securityApi } from "../api/api";

const initialState = {
  isAuth: false,
  id: null,
  login: null,
  email: null,
  captcha: null,
  name: null,
  photoSmall: null,
};

// actions

const SET_AUTH = "social/auth/SET_AUTH";
const SET_AUTH_DATA = "social/auth/SET_AUTH_DATA";
const SET_CAPTCHA = "social/auth/SET_CAPTCHA";
const SET_NAME = "social/auth/SET_NAME";
const SET_PHOTO_SMALL = "social/auth/SET_PHOTO_SMALL"; 

// action creators

export const setCaptcha = (captcha) => ({ type: SET_CAPTCHA, captcha });
export const setAuth = (state) => ({ type: SET_AUTH, state });
export const setAuthData = (id, login, email) => ({
  type: SET_AUTH_DATA,
  id,
  email,
  login,
});
export const setName = (name) => ({ type: SET_NAME, name });
export const setPhotoSmall = (photo) => ({ type: SET_PHOTO_SMALL, photo });

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PHOTO_SMALL:
      return {
        ...state,
        photoSmall: action.photo,
      }
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      }
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

export const getUserData = () => {
  return async (dispatch, getState) => {
    const response = await profileApi.getProfile(getState().auth.id);
    if (response) {
      dispatch(setName(response.fullName));
      dispatch(setPhotoSmall(response.photos.small));
    }
  }
}

export default authReducer;
