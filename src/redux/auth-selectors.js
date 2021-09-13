export const auth = (state) => {
    return state.auth.isAuth;
}

export const captcha = (state) => {
    return state.auth.captcha;
}

export const selectAuthId = (state) => {
    return state.auth.id;
}

export const selectName = (state) => {
    return state.auth.name;
}

export const selectPhotoSmall = (state) => {
    return state.auth.photoSmall;
}