import { ThunkAction } from "redux-thunk";
import { profileApi } from "../api/api";
import { InferValueType, TRootState } from "./store";

const initialState = {
  profile: null as null | TProfile,
  status: null as null | string,
};

// actions

const SET_STATUS = "social/profile/SET_STATUS";
const SET_PROFILE = "social/profile/SET_PROFILE";
const SET_PHOTOS = "social/profile/SET_PHOTOS";
const UPDATE_PROFILE = "social/profile/UPDATE_PROFILE";

// actions creators

export const actions = {
  setStatus: (status: string) =>
    ({
      type: SET_STATUS,
      status,
    } as const),
  setProfile: (profile: TProfile) =>
    ({
      type: SET_PROFILE,
      profile,
    } as const),
  setPhotos: (photos: TPhotos) =>
    ({
      type: SET_PHOTOS,
      photos,
    } as const),
  updateProfile: (profile: TProfile) =>
    ({
      type: UPDATE_PROFILE,
      profile,
    } as const),
};

// reducer

const profileReducer = (
  state: TInitialState = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: { ...state.profile, ...action.profile },
      };
    case SET_PHOTOS:
      return {
        ...state,
        profile: { ...state.profile, photos: action.photos } as TProfile,
      };
    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };
    case SET_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return {
        ...state,
      };
  }
};

// thunks

export const getStatus = (id: number): TThunk => {
  return async (dispatch) => {
    const response = await profileApi.getStatus(id);
    if (response) {
      dispatch(actions.setStatus(response));
    }
  };
};

export const getProfile = (id: number): TThunk => {
  return async (dispatch) => {
    const response = await profileApi.getProfile(id);
    if (response) {
      dispatch(actions.setProfile(response));
    }
  };
};

export const putStatus = (status: string): TThunk => {
  return async (dispatch) => {
    const response = await profileApi.putStatus({ status });
    if (response.resultCode === 0) {
      dispatch(actions.setStatus(status));
    }
  };
};

export const putPhoto = (photo: any): TThunk => {
  return async (dispatch, getState) => {
    const response = await profileApi.putPhoto(photo);
    if (response.resultCode === 0) {
      const id = getState().auth.id;
      const responce = await profileApi.getProfile(id);
      if (responce) {
        dispatch(actions.setProfile(responce));
      }
    }
  };
};

export const putProfile = (profile: TProfile): TThunk => {
  return async (dispatch) => {
    const response = await profileApi.putProfile(profile);
    if (response.resultCode === 0) {
      dispatch(actions.updateProfile(profile));
    }
  };
};

export default profileReducer;

// Types

type TInitialState = typeof initialState;

type TPhotos = {
  small: string | null;
  large: string | null;
};

export type TContacts = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink?: string | null;
};

export type TProfile = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  fullName: string;
  contacts: TContacts;
  photos?: TPhotos;
  aboutMe?: string;
};

type TActions = ReturnType<InferValueType<typeof actions>>;

type TThunk = ThunkAction<Promise<void>, TRootState, {}, TActions>;
