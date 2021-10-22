import { InferValueType } from "./store";

const initialState = {
  messages: [
    {
      id: 0,
      name: "Vitalic",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deserunt, officia!",
    },
    {
      id: 1,
      name: "Vitalic",
      message: "Lorem ipsum, dolor sit amet.",
    },
    {
      id: 2,
      name: "Vitalic",
      message: "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    },
  ],
};

// actions

const ADD_MESSAGE = "social/dialogs/ADD_MESSAGE";

// action creators

export const actions = {
  addMessage: (message: TMessage) => ({
    type: ADD_MESSAGE,
    message,
  } as const),
}

//reducer

const dialogReducer = (
  state: TInitialState = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case ADD_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.message],
      };
    default:
      return {
        ...state,
      };
  }
};

export default dialogReducer;

// Types

type TInitialState = typeof initialState;

export type TMessage = {
  id: number;
  name: string;
  message: string;
};

type TActions = ReturnType<InferValueType<typeof actions>>;
