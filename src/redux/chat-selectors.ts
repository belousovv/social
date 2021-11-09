import { TRootState } from "./store";

export const selectMessages = (state: TRootState) => {
    return state.chat.messages;
}

export const selectStatus = (state: TRootState) => {
    return state.chat.status;
}