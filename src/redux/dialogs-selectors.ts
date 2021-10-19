import { TRootState } from "./store";

export const getMessages = (state: TRootState) => {
    return state.dialogs.messages;
}
