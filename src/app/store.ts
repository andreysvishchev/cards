import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk from 'redux-thunk'
import {cardsReducer} from "../pages/cards/cardsReducer";
import {registrationReducer} from "../pages/registration/registrationReducer";
import {appReducer} from "./appReducer";
import {ProfileReducer} from "../pages/profile/profileReducer";
import {loginReducer} from "../pages/login/loginReducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    cards: cardsReducer,
    registration: registrationReducer,
    profile: ProfileReducer,
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStateType = ReturnType<typeof rootReducer>