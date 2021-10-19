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

export const addMessage = (message: TMessage): TAddMessageAction => ({
  type: ADD_MESSAGE,
  message,
});

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

type TMessage = {
  id: number;
  name: string;
  message: string;
};

type TAddMessageAction = {
  type: typeof ADD_MESSAGE;
  message: TMessage;
};

type TActions = TAddMessageAction;
