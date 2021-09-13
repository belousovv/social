import { profileApi } from "../api/api";

const initialState = {
  profile: null,
  status: null,
};

// actions

const SET_STATUS = "social/profile/SET_STATUS";
const SET_PROFILE = "social/profile/SET_PROFILE";
const SET_PHOTOS = "social/profile/SET_PHOTOS";
const UPDATE_PROFILE = "social/profile/UPDATE_PROFILE";

// actions creators

export const setStatus = (status) => ({ type: SET_STATUS, status });
export const setProfile = (profile) => ({ type: SET_PROFILE, profile });
export const setPhotos = (photos) => ({ type: SET_PHOTOS, photos });
export const updateProfile = (profile) => ({type: UPDATE_PROFILE, profile});
 
// reducer

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: {...state.profile, ...action.profile}
      }
    case SET_PHOTOS:
      return {
        ...state,
        profile: {...state.profile, photos: action.photos}
      }
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

export const getStatus = (id) => {
  return async (dispatch) => {
    const response = await profileApi.getStatus(id);
    if (response) {
      dispatch(setStatus(response));
    }
  };
};

export const getProfile = (id) => {
  return async (dispatch) => {
    const response = await profileApi.getProfile(id);
    if (response) {
      dispatch(setProfile(response));
    }
  };
};

export const putStatus = (status) => {
  return async (dispatch) => {
    const response = await profileApi.putStatus({status});
    if (response.resultCode === 0) {
      dispatch(setStatus(status));
    }
  }
}

export const putPhoto = (photo) => {
  return async (dispatch) => {
    const response = await profileApi.putPhoto(photo);
    if (response.resultCode === 0) {
      dispatch(setPhotos(response.data))
    }
  }
}

export const putProfile = (profile) => {
  return async (dispatch) => {
    const response = await profileApi.putProfile(profile);
    if (response.resultCode === 0) {
      dispatch(updateProfile(profile));
    }
  }
}

export default profileReducer;
