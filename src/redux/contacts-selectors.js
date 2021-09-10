export const selectContacts = (state) => {
    return state.contacts.contacts;
}

export const selectPage = (state) => {
    return state.contacts.page;
}

export const selectCount = (state) => {
    return state.contacts.count;
}