import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from "./app-reducer";
import dialogReducer from "./dialogs-reducer";
import contactsReducer from "./contacts-reducer";
import profileReducer from "./profile-reducer";

const { createStore, combineReducers, applyMiddleware } = require("redux");

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    dialogs: dialogReducer,
    contacts: contactsReducer,
    profile: profileReducer,
});

const store = createStore(rootReducer,  composeWithDevTools(applyMiddleware(thunk)));

export default store;

//@ts-ignore
window.store = store;

// Types

export type TRootState = ReturnType<typeof rootReducer>;