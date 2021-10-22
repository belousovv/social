import { ThunkAction } from "redux-thunk";
import { getAuth } from "./auth-reducer";
import { InferValueType, TRootState } from "./store";

const initialState = {
  isInitialized: false,
};

// actions

const INITIALIZE_SUCCESS = "social/app/INITIALIZE_SUCCESS";

// action creators

export const actions = {
  initializeSuccess: (payload: boolean) => ({ type: INITIALIZE_SUCCESS, payload } as const),
}

// reducer

const appReducer = (state: TInitialState = initialState, action: TActions): TInitialState => {
  switch (action.type) {
    case INITIALIZE_SUCCESS:
      return {
        ...state,
        isInitialized: action.payload,
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
    dispatch(actions.initializeSuccess(false))
    await dispatch(getAuth());
    dispatch(actions.initializeSuccess(true));
  };
};

export default appReducer;

// Types

type TThunks = ThunkAction<Promise<void>,TRootState, {}, TActions>;

type TInitialState = typeof initialState;

type TActions = ReturnType<InferValueType<typeof actions>>;
