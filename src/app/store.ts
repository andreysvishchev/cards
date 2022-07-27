import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk from 'redux-thunk'
import {cardsReducer} from "../pages/cards/cardsReducer";
import {registrationReducer} from "../pages/registration/registrationReducer";
import {appReducer} from "./appReducer";
import {profileReducer} from "../pages/profile/profileReducer";
import {loginReducer} from "../pages/login/loginReducer";
import {passwordNewReducer} from "../pages/password-new/passwordNewReducer";
import {passwordRecoveryReducer} from "../pages/password-recovery/passwordRecoveryReducer";

const rootReducer = combineReducers({
    app: appReducer,
    login: loginReducer,
    cards: cardsReducer,
    registration: registrationReducer,
    profile: profileReducer,
	passwordNew: passwordNewReducer,
	passwordRecovery:passwordRecoveryReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStateType = ReturnType<typeof rootReducer>