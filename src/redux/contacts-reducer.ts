import { ThunkAction } from "redux-thunk";
import { followApi, usersApi } from "../api/api";
import { TRootState } from "./store";

const initialState = {
  page: 1,
  count: 8,
  contacts: null as null | Array<TUser>,
  totalCountUsers: null as null | number,
  portionSize: 8,
  followingProcess: [] as Array<number>,
  friends: null as null | Array<TUser>,
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

export const setContacts = (contacts: Array<TUser>): TSetContactsAction => ({
  type: SET_CONTACTS,
  contacts,
});
export const setTotalCountUsers = (
  totalCountUsers: number
): TSetTotalCountUsersAction => ({
  type: SET_TOTAL_COUNT_USERS,
  totalCountUsers,
});
export const setPage = (page: number): TSetPageAction => ({
  type: SET_PAGE,
  page,
});
export const setFollow = (id: number): TSetFollowAction => ({
  type: SET_FOLLOW,
  id,
});
export const setUnfollow = (id: number): TSetUnfollowAction => ({
  type: SET_UNFOLLOW,
  id,
});
export const setFollowingProcess = (
  state: boolean,
  id: number
): TSetFollowingProcessAction => ({
  type: FOLLOWING_PROCESS,
  state,
  id,
});
export const setFriends = (friends: Array<TUser>): TSetFriendsAction => ({
  type: SET_FRIENDS,
  friends,
});

// reducer

const contactsReducer = (
  state = initialState,
  action: TActions
): TInitialState => {
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
    dispatch(setFriends(response.items));
  };
};

export const getContacts = (): TThunk => {
  return async (dispatch, getState) => {
    const response = await usersApi.getContacts(
      getState().contacts.count,
      getState().contacts.page
    );
    dispatch(setContacts(response.items));
    dispatch(setTotalCountUsers(response.totalCount));
  };
};

export const getContactsByName = (name: string): TThunk => {
  return async (dispatch) => {
    const response = await usersApi.getContactsByName(name);
    dispatch(setContacts(response.items));
  };
};

export const changePage = (page: number): TThunk => {
  return async (dispatch, getState) => {
    const response = await usersApi.getContacts(
      getState().contacts.count,
      page
    );
    dispatch(setContacts(response.items));
    dispatch(setPage(page));
  };
};

export const follow = (id: number): TThunk => {
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

export const unfollow = (id: number): TThunk => {
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

// Types

export type TUser = {
  id: number;
  name: string;
  status: string;
  followed: boolean;
  photos: { small: string | null; large: string | null };
};

type TInitialState = typeof initialState;

type TSetContactsAction = {
  type: typeof SET_CONTACTS;
  contacts: Array<TUser>;
};

type TSetTotalCountUsersAction = {
  type: typeof SET_TOTAL_COUNT_USERS;
  totalCountUsers: number;
};

type TSetPageAction = {
  type: typeof SET_PAGE;
  page: number;
};

type TSetFollowAction = {
  type: typeof SET_FOLLOW;
  id: number;
};

type TSetUnfollowAction = {
  type: typeof SET_UNFOLLOW;
  id: number;
};

type TSetFollowingProcessAction = {
  type: typeof FOLLOWING_PROCESS;
  state: boolean;
  id: number;
};

type TSetFriendsAction = {
  type: typeof SET_FRIENDS;
  friends: Array<TUser>;
};

type TActions =
  | TSetContactsAction
  | TSetTotalCountUsersAction
  | TSetPageAction
  | TSetFollowAction
  | TSetUnfollowAction
  | TSetFollowingProcessAction
  | TSetFriendsAction;

type TThunk = ThunkAction<Promise<void>, TRootState, {}, TActions>;
