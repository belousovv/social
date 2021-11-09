import authReducer from "./auth-reducer";
import thunk, { ThunkAction } from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from "./app-reducer";
import dialogReducer from "./dialogs-reducer";
import contactsReducer from "./contacts-reducer";
import profileReducer from "./profile-reducer";
import { Action, createStore, combineReducers, applyMiddleware } from "redux";
import chatReducer from "./chat-reducer";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    dialogs: dialogReducer,
    contacts: contactsReducer,
    profile: profileReducer,
    chat: chatReducer
});

const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)));

export default store;

//@ts-ignore
window.store = store;

// Types

export type TRootState = ReturnType<typeof rootReducer>;

export type InferValueType<T> = T extends {[keys: string]: infer U}? U : never;

export type TBaseThunk<T extends Action> = ThunkAction<Promise<void>, TRootState, {}, T>;