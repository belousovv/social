import { TRootState } from "./store";

export const selectMessages = (state: TRootState) => {
    return state.chat.messages;
}