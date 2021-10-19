import { TRootState } from "./store";

export const getInitialized = (state: TRootState) => {
    return state.app.isInitialized;
}