import { TRootState } from "./store";

export const selectContacts = (state: TRootState) => {
  return state.contacts.contacts;
}

export const selectPage = (state: TRootState) => {
  return state.contacts.page;
}

export const selectCount = (state: TRootState) => {
  return state.contacts.count;
}

export const selectTotalCountUsers = (state: TRootState) => {
  return state.contacts.totalCountUsers;
}

export const selectPortionSize = (state: TRootState) => {
  return state.contacts.portionSize;
}

export const selectFollowingProcess = (state: TRootState) => {
  return state.contacts.followingProcess;
}

export const selectFriends = (state: TRootState) => {
  return state.contacts.friends;
}

export const selectFilter = (state: TRootState) => {
  return state.contacts.filter;
}
