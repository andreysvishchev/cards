import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {loginReducer} from "../pages/login/loginReducer";
import {cardsReducer} from "../pages/cards/cardsReducer";
import { registrationReducer } from "../pages/registration/registrationReducer";

const rootReducer = combineReducers({
    login: loginReducer,
    cards: cardsReducer,
    registration: registrationReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector
