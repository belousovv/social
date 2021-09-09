import { getAuth } from "./auth-reducer";

const initialState = {
  isInitialized: false,
};

// actions

const INITIALIZE_SUCCESS = "social/app/INITIALIZE_SUCCESS";

// action creators

const initializeSuccess = () => ({ type: INITIALIZE_SUCCESS });

// reducer

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        isInitialized: true,
      };
    default:
      return {
        ...state,
      };
  }
};

// thunks

export const startInitialize = () => {
  return async (dispatch) => {
    await dispatch(getAuth());
    dispatch(initializeSuccess());
  };
};

export default appReducer;
