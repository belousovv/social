import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { chatApi, TChatMessage } from "../api/chat-api";
import { InferValueType, TRootState } from "./store";

let unsubscribe: () => void;

// state
const initialState = {
  messages: [] as TChatMessage[],
};

const MESSAGES_RECEIVED = "social/chat/MESSAGES_RECEIVED";

// actions
export const actions = {
  messagesReceived: (messages: TChatMessage[]) =>
    ({ type: MESSAGES_RECEIVED, payload: { messages } } as const),
};

// reducer
const chatReducer = (
  state: TInitialState = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case MESSAGES_RECEIVED:
      return {
        ...state,
        messages: [...state.messages, ...action.payload.messages],
      };
    default:
      return state;
  }
};

export default chatReducer;

// thunks

let _newMessageHandler: ((messages: TChatMessage[]) => void) | null = null;

const newMessageHandlerCreator = (dispatch: Dispatch) => {
  if (_newMessageHandler === null) {
    _newMessageHandler = (messages: TChatMessage[]) => {
      dispatch(actions.messagesReceived(messages));
    };
  }
  return _newMessageHandler;
};

export const startListenMessages = (): TThunk => {
  return async (dispatch) => {
    chatApi.start();
    unsubscribe = await chatApi.subscribe(newMessageHandlerCreator(dispatch));
  };
};

export const stopListenMessages = (): TThunk => {
  return async () => {
    chatApi.stop();
    await unsubscribe();
  };
};

export const sendMessage = (message: string): TThunk => {
  return async () => {
    await chatApi.sendMessage(message);
  }
}

// Types
type TInitialState = typeof initialState;

type TActions = ReturnType<InferValueType<typeof actions>>;

type TThunk = ThunkAction<Promise<void>, TRootState, {}, TActions>;
