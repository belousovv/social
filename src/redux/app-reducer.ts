import { ThunkAction } from "redux-thunk";
import { getAuth } from "./auth-reducer";
import { TRootState } from "./store";

const initialState = {
  isInitialized: false,
};

// actions

const INITIALIZE_SUCCESS = "social/app/INITIALIZE_SUCCESS";

// action creators

const initializeSuccess = (): TInitializeSuccessAction => ({ type: INITIALIZE_SUCCESS });

// reducer

const appReducer = (state: TInitialState = initialState, action: TActions): TInitialState => {
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

export const startInitialize = (): TThunks => {
  return async (dispatch) => {
    await dispatch(getAuth());
    dispatch(initializeSuccess());
  };
};

export default appReducer;

// Types

type TThunks = ThunkAction<Promise<void>,TRootState, {}, TActions>;

type TActions = TInitializeSuccessAction;

type TInitializeSuccessAction = {
  type: typeof INITIALIZE_SUCCESS
}

type TInitialState = typeof initialState;
