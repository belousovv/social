import { Dispatch } from "redux";
import { ThunkAction } from "redux-thunk";
import { chatApi, TChatMessage } from "../api/chat-api";
import { InferValueType, TRootState } from "./store";
import {v4} from "uuid";

let unsubscribeMR: () => void;
let unsubscribeSCH: () => void;

// state
const initialState = {
  messages: [] as TChatMessageWithId[],
  status: "pending" as TStatus,
};

const MESSAGES_RECEIVED = "social/chat/MESSAGES_RECEIVED";
const STATUS_CHANGED = "social/chat/STATUS_CHANGED";

// actions
export const actions = {
  messagesReceived: (messages: TChatMessage[]) =>
    ({ type: MESSAGES_RECEIVED, payload: { messages } } as const),
  statusChanged: (status: TStatus) =>
    ({ type: STATUS_CHANGED, payload: { status } } as const),
};

// reducer
const chatReducer = (
  state: TInitialState = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case STATUS_CHANGED:
      return {
        ...state,
        status: action.payload.status,
      };
    case MESSAGES_RECEIVED:
      const newMessages = [...state.messages, ...action.payload.messages.map(m => ({...m, id: v4()}))];
      return {
        ...state,
        messages: newMessages.slice(newMessages.length - 11)
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

let _statusChangedHandler: ((status: TStatus) => void) | null = null;

const statusChangedHandlerCreator = (dispatch: Dispatch) => {
  if (_statusChangedHandler === null) {
    _statusChangedHandler = (status: TStatus) => {
      dispatch(actions.statusChanged(status));
    };
  }
  return _statusChangedHandler;
};

export const startListenMessages = (): TThunk => {
  return async (dispatch) => {
    chatApi.start();
    unsubscribeMR = await chatApi.subscribe("messages-received", newMessageHandlerCreator(dispatch));
    unsubscribeSCH = await chatApi.subscribe("status-changed", statusChangedHandlerCreator(dispatch));
  };
};

export const stopListenMessages = (): TThunk => {
  return async () => {
    chatApi.stop();
    await unsubscribeMR();
    await unsubscribeSCH();
  };
};

export const sendMessage = (message: string): TThunk => {
  return async () => {
    await chatApi.sendMessage(message);
  };
};

// Types
type TInitialState = typeof initialState;

type TActions = ReturnType<InferValueType<typeof actions>>;

type TThunk = ThunkAction<Promise<void>, TRootState, {}, TActions>;

export type TStatus = "pending" | "ready" | "error";

export type TChatMessageWithId = TChatMessage & {id: string};
