export const selectContacts = (state) => {
    return state.contacts.contacts;
}

export const selectPage = (state) => {
    return state.contacts.page;
}

export const selectCount = (state) => {
    return state.contacts.count;
}

export const selectTotalCountUsers = (state) => {
    return state.contacts.totalCountUsers;
}

export const selectPortionSize = (state) => {
    return state.contacts.portionSize;
}

export const selectFollowingProcess = (state) => {
    return state.contacts.followingProcess;
}

export const selectFriends = (state) => {
    return state.contacts.friends;
}