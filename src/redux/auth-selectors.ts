import { TRootState } from "./store";

export const auth = (state: TRootState) => {
    return state.auth.isAuth;
}

export const captcha = (state: TRootState) => {
    return state.auth.captcha;
}

export const selectAuthId = (state: TRootState) => {
    return state.auth.id;
}

export const selectName = (state: TRootState) => {
    return state.auth.name;
}

export const selectPhotoSmall = (state: TRootState) => {
    return state.auth.photoSmall;
}

export const selectCaptcha = (state: TRootState) => {
    return state.auth.captcha;
}