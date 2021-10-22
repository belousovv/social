import { ThunkAction } from "redux-thunk";
import { authApi, profileApi, securityApi } from "../api/api";
import { InferValueType, TRootState } from "./store";

const initialState = {
  isAuth: false,
  id: null as null | number,
  login: null as null | string,
  email: null as null | string,
  captcha: null as null | string,
  name: null as null | string,
  photoSmall: null as null | string,
};

// actions

const SET_AUTH = "social/auth/SET_AUTH";
const SET_AUTH_DATA = "social/auth/SET_AUTH_DATA";
const SET_CAPTCHA = "social/auth/SET_CAPTCHA";
const SET_NAME = "social/auth/SET_NAME";
const SET_PHOTO_SMALL = "social/auth/SET_PHOTO_SMALL";

// action creators

export const actions = {
  setCaptcha: (captcha: string) =>
    ({
      type: SET_CAPTCHA,
      captcha,
    } as const),
  setAuth: (state: boolean) =>
    ({
      type: SET_AUTH,
      state,
    } as const),
  setAuthData: (id: number, login: string, email: string) =>
    ({
      type: SET_AUTH_DATA,
      id,
      email,
      login,
    } as const),
  setName: (name: string) =>
    ({
      type: SET_NAME,
      name,
    } as const),
  setPhotoSmall: (photo: string) =>
    ({
      type: SET_PHOTO_SMALL,
      photo,
    } as const),
};

// reducer

const authReducer = (
  state: TInitialState = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case SET_PHOTO_SMALL:
      return {
        ...state,
        photoSmall: action.photo,
      };
    case SET_NAME:
      return {
        ...state,
        name: action.name,
      };
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

export const getAuth = (): TThunks => {
  return async (dispatch) => {
    const response = await authApi.getAuth();
    if (response.resultCode === 0) {
      dispatch(actions.setAuth(true));
      dispatch(
        actions.setAuthData(
          response.data.id,
          response.data.login,
          response.data.email
        )
      );
    } else {
      dispatch(actions.setAuth(false));
    }
  };
};
export const login = (
  email: string,
  password: string,
  rememberMe: boolean,
  captcha: string
): TThunks => {
  return async (dispatch) => {
    const response = await authApi.login(email, password, rememberMe, captcha);
    if (response.resultCode === 0) {
      dispatch(getAuth());
    } else if (response.resultCode === 10) {
      dispatch(getCaptcha());
    }
  };
};

export const logout = (): TThunks => {
  return async (dispatch) => {
    const response = await authApi.logout();
    if (response.resultCode === 0) {
      dispatch(getAuth());
    }
  };
};

export const getCaptcha = (): TThunks => {
  return async (dispatch) => {
    const response = await securityApi.getCaptcha();
    if (response) {
      dispatch(actions.setCaptcha(response.url));
    }
  };
};

export const getUserData = (): TThunks => {
  return async (dispatch, getState) => {
    const response = await profileApi.getProfile(getState().auth.id);
    if (response) {
      dispatch(actions.setName(response.fullName));
      if (response.photos && response.photos.small) {
        dispatch(actions.setPhotoSmall(response.photos.small));
      }
    }
  };
};

export default authReducer;

// Types

type TInitialState = typeof initialState;

type TActions = ReturnType<InferValueType<typeof actions>>;

type TThunks = ThunkAction<Promise<void>, TRootState, {}, TActions>;
