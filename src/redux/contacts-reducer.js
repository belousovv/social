import { followApi, usersApi } from "../api/api";

const initialState = {
  page: 1,
  count: 8,
  contacts: null,
  totalCountUsers: null,
  portionSize: 8,
  followingProcess: [],
  friends: null,
};

// actions

const SET_CONTACTS = "social/contacts/SET_CONTACTS";
const SET_TOTAL_COUNT_USERS = "social/contacts/SET_TOTAL_COUNT_USERS";
const SET_PAGE = "social/contacts/SET_PAGE";
const SET_FOLLOW = "social/contacts/SET_FOLLOW";
const SET_UNFOLLOW = "social/contacts/SET_UNFOLLOW";
const FOLLOWING_PROCESS = "social/contacts/FOLLOWING_PROCESS";
const SET_FRIENDS = "social/contacts/SET_FRIENDS";

// action creators

export const setContacts = (contacts) => ({ type: SET_CONTACTS, contacts });
export const setTotalCountUsers = (totalCountUsers) => ({
  type: SET_TOTAL_COUNT_USERS,
  totalCountUsers,
});
export const setPage = (page) => ({ type: SET_PAGE, page });
export const setFollow = (id) => ({ type: SET_FOLLOW, id });
export const setUnfollow = (id) => ({ type: SET_UNFOLLOW, id });
export const setFollowingProcess = (state, id) => ({
  type: FOLLOWING_PROCESS,
  state,
  id,
});
export const setFriends = (friends) => ({ type: SET_FRIENDS, friends });

// reducer

const contactsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_FRIENDS:
      return {
        ...state,
        friends: action.friends,
      };
    case FOLLOWING_PROCESS:
      return {
        ...state,
        followingProcess: action.state
          ? [...state.followingProcess, action.id]
          : [...state.followingProcess.filter((el) => el !== action.id)],
      };
    case SET_FOLLOW:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.id) {
            return { ...contact, followed: true };
          } else {
            return contact;
          }
        }),
      };
    case SET_UNFOLLOW:
      return {
        ...state,
        contacts: state.contacts.map((contact) => {
          if (contact.id === action.id) {
            return { ...contact, followed: false };
          } else {
            return contact;
          }
        }),
      };
    case SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case SET_TOTAL_COUNT_USERS:
      return {
        ...state,
        totalCountUsers: action.totalCountUsers,
      };
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

export const getFriends = () => {
  return async (dispatch) => {
    const response = await usersApi.getFriends();
    dispatch(setFriends(response.items));
  };
};

export const getContacts = () => {
  return async (dispatch, getState) => {
    const response = await usersApi.getContacts(
      getState().contacts.count,
      getState().contacts.page
    );
    dispatch(setContacts(response.items));
    dispatch(setTotalCountUsers(response.totalCount));
  };
};

export const getContactsByName = (name) => {
  return async (dispatch) => {
    const response = await usersApi.getContactsByName(name);
    dispatch(setContacts(response.items));
  }
}

export const changePage = (page) => {
  return async (dispatch, getState) => {
    const response = await usersApi.getContacts(
      getState().contacts.count,
      page
    );
    dispatch(setContacts(response.items));
    dispatch(setPage(page));
  };
};

export const follow = (id) => {
  return async (dispatch) => {
    dispatch(setFollowingProcess(true, id));
    const response = await followApi.follow(id);
    dispatch(setFollowingProcess(false, id));
    if (response.resultCode === 0) {
      dispatch(setFollow(id));
      dispatch(getFriends());
    }
  };
};

export const unfollow = (id) => {
  return async (dispatch) => {
    dispatch(setFollowingProcess(true, id));
    const response = await followApi.unfollow(id);
    dispatch(setFollowingProcess(false, id));
    if (response.resultCode === 0) {
      dispatch(setUnfollow(id));
      dispatch(getFriends());
    }
  };
};

export default contactsReducer;
