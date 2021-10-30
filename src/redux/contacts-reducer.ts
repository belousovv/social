import { followApi, usersApi } from "../api/api";
import { InferValueType, TBaseThunk } from "./store";

const initialState = {
  page: 1,
  count: 8,
  contacts: null as null | Array<TUser>,
  totalCountUsers: null as null | number,
  portionSize: 8,
  followingProcess: [] as Array<number>,
  friends: null as null | Array<TUser>,
  filter: {
    term: null,
  } as TTerm,
};

// actions

const SET_CONTACTS = "social/contacts/SET_CONTACTS";
const SET_TOTAL_COUNT_USERS = "social/contacts/SET_TOTAL_COUNT_USERS";
const SET_PAGE = "social/contacts/SET_PAGE";
const SET_FOLLOW = "social/contacts/SET_FOLLOW";
const SET_UNFOLLOW = "social/contacts/SET_UNFOLLOW";
const FOLLOWING_PROCESS = "social/contacts/FOLLOWING_PROCESS";
const SET_FRIENDS = "social/contacts/SET_FRIENDS";
const SET_FILTER = "social/contacts/SET_FILTER";

// action creators

export const actions = {
  setFilter: (term: string) => ({ type: SET_FILTER, term } as const),
  setContacts: (contacts: Array<TUser>) =>
  ({
    type: SET_CONTACTS,
    contacts,
  } as const),
  setTotalCountUsers: (totalCountUsers: number) =>
  ({
    type: SET_TOTAL_COUNT_USERS,
    totalCountUsers,
  } as const),
  setPage: (page: number) =>
  ({
    type: SET_PAGE,
    page,
  } as const),
  setFollow: (id: number) =>
  ({
    type: SET_FOLLOW,
    id,
  } as const),
  setUnfollow: (id: number) =>
  ({
    type: SET_UNFOLLOW,
    id,
  } as const),
  setFollowingProcess: (state: boolean, id: number) =>
  ({
    type: FOLLOWING_PROCESS,
    state,
    id,
  } as const),
  setFriends: (friends: Array<TUser>) =>
  ({
    type: SET_FRIENDS,
    friends,
  } as const),
};

// reducer

const contactsReducer = (
  state = initialState,
  action: TActions
): TInitialState => {
  switch (action.type) {
    case SET_FILTER:
      return {
        ...state,
        filter: { term: action.term }
      };
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
        contacts: state.contacts!.map((contact) => {
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
        contacts: state.contacts!.map((contact) => {
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

export const getFriends = (): TThunk => {
  return async (dispatch) => {
    const response = await usersApi.getFriends();
    dispatch(actions.setFriends(response.items));
  };
};

export const getContacts = (): TThunk => {
  return async (dispatch, getState) => {
    const response = await usersApi.getContacts(
      getState().contacts.count,
      getState().contacts.page,
      getState().contacts.filter.term,
    );
    dispatch(actions.setContacts(response.items));
    dispatch(actions.setTotalCountUsers(response.totalCount));
  };
};

export const getContactsByName = (name: string): TThunk => {
  return async (dispatch) => {
    const response = await usersApi.getContactsByName(name);
    dispatch(actions.setContacts(response.items));
  };
};

export const changePage = (page: number): TThunk => {
  return async (dispatch, getState) => {
    const response = await usersApi.getContacts(
      getState().contacts.count,
      page,
      getState().contacts.filter.term
    );
    dispatch(actions.setContacts(response.items));
    dispatch(actions.setPage(page));
  };
};

export const follow = (id: number): TThunk => {
  return async (dispatch) => {
    dispatch(actions.setFollowingProcess(true, id));
    const response = await followApi.follow(id);
    dispatch(actions.setFollowingProcess(false, id));
    if (response.resultCode === 0) {
      dispatch(actions.setFollow(id));
      dispatch(getFriends());
    }
  };
};

export const unfollow = (id: number): TThunk => {
  return async (dispatch) => {
    dispatch(actions.setFollowingProcess(true, id));
    const response = await followApi.unfollow(id);
    dispatch(actions.setFollowingProcess(false, id));
    if (response.resultCode === 0) {
      dispatch(actions.setUnfollow(id));
      dispatch(getFriends());
    }
  };
};

export default contactsReducer;

// Types

export type TUser = {
  id: number;
  name: string;
  status: string;
  followed: boolean;
  photos: { small: string | null; large: string | null };
};

type TTerm = {
  term: null | string;
}

type TInitialState = typeof initialState;

type TActions = ReturnType<InferValueType<typeof actions>>;

type TThunk = TBaseThunk<TActions>;
