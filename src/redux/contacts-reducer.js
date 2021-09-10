import { usersApi } from "../api/api";

const initialState = {
  page: 1,
  count: 8,
  contacts: null,
};

// actions

const SET_CONTACTS = "social/contacts/SET_CONTACTS";

// action creators

export const setContacts = (contacts) => ({ type: SET_CONTACTS, contacts });

// reducer

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CONTACTS:
      return {
        ...state,
        contacts: action.contacts,
      };
    default:
      return {
        ...state,
      };
  }
};

// thunks

export const getContacts = (
  count = initialState.count,
  page = initialState.page
) => {
  return async (dispatch) => {
    const response = await usersApi.getContacts(count, page);
    dispatch(setContacts(response.items));
  };
};

export default contactsReducer;
