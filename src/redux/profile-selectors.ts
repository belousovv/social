import { TRootState } from "./store";

export const selectStatus = (state: TRootState) => {
    return state.profile.status;
}

export const selectProfile = (state: TRootState) => {
    return state.profile.profile;
}