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
      message:
        "Lorem ipsum, dolor sit amet.",
    },
    {
      id: 2,
      name: "Vitalic",
      message:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
    },
  ],
};

// actions

const ADD_MESSAGE = "social/dialogs/ADD_MESSAGE";

// action creators

export const addMessage = (message) => ({ type: ADD_MESSAGE, message });

//reducer

const dialogReducer = (state = initialState, action) => {
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
