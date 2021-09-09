import authReducer from "./auth-reducer";
import thunk from "redux-thunk";
import { composeWithDevTools } from 'redux-devtools-extension';
import appReducer from "./app-reducer";
import dialogReducer from "./dialogs-reducer";
import contactsReducer from "./contacts-reducer";

const { createStore, combineReducers, applyMiddleware } = require("redux");

const reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    dialogs: dialogReducer,
    contacts: contactsReducer,
});

const store = createStore(reducers,  composeWithDevTools(applyMiddleware(thunk)));

export default store;

window.store = store;