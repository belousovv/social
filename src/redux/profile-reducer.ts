import { ThunkAction } from "redux-thunk";
import { profileApi } from "../api/api";
import { TRootState } from "./store";

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

export const setStatus = (status: string): TSetStatusAction => ({
  type: SET_STATUS,
  status,
});
export const setProfile = (profile: TProfile): TSetProfileAction => ({
  type: SET_PROFILE,
  profile,
});
export const setPhotos = (photos: TPhotos): TSetPhotosAction => ({
  type: SET_PHOTOS,
  photos,
});
export const updateProfile = (profile: TProfile): TUpdateProfileAction => ({
  type: UPDATE_PROFILE,
  profile,
});

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
        //TODO: TProfile can be wrong, profile-image do not auto-update after set
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
      dispatch(setStatus(response));
    }
  };
};

export const getProfile = (id: number): TThunk => {
  return async (dispatch) => {
    const response = await profileApi.getProfile(id);
    if (response) {
      dispatch(setProfile(response));
    }
  };
};

export const putStatus = (status: string): TThunk => {
  return async (dispatch) => {
    const response = await profileApi.putStatus({ status });
    if (response.resultCode === 0) {
      dispatch(setStatus(status));
    }
  };
};

export const putPhoto = (photo: string): TThunk => {
  return async (dispatch) => {
    const response = await profileApi.putPhoto(photo);
    if (response.resultCode === 0) {
      dispatch(setPhotos(response.data));
    }
  };
};

export const putProfile = (profile: TProfile): TThunk => {
  return async (dispatch) => {
    const response = await profileApi.putProfile(profile);
    if (response.resultCode === 0) {
      dispatch(updateProfile(profile));
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

type TContacts = {
  github: string | null;
  vk: string | null;
  facebook: string | null;
  instagram: string | null;
  twitter: string | null;
  website: string | null;
  youtube: string | null;
  mainLink: string | null;
};

type TProfile = {
  userId: number;
  lookingForAJob: boolean;
  lookingForAJobDescription: boolean;
  fullName: string;
  contacts: TContacts;
  photos: TPhotos;
};

type TSetStatusAction = {
  type: typeof SET_STATUS;
  status: string;
};

type TSetProfileAction = {
  type: typeof SET_PROFILE;
  profile: TProfile;
};

type TSetPhotosAction = {
  type: typeof SET_PHOTOS;
  photos: TPhotos;
};

type TUpdateProfileAction = {
  type: typeof UPDATE_PROFILE;
  profile: TProfile;
};

type TActions =
  | TSetStatusAction
  | TSetProfileAction
  | TSetPhotosAction
  | TUpdateProfileAction;

type TThunk = ThunkAction<Promise<void>, TRootState, {}, TActions>;
