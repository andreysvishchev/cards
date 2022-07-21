import {applyMiddleware, combineReducers, legacy_createStore as createStore} from "redux";
import thunk from 'redux-thunk'
import {TypedUseSelectorHook, useSelector} from "react-redux";
import {authReducer} from "./auth-reducer";
import {cardsReducer} from "./cards-reducer";

const rootReducer = combineReducers({
    auth: authReducer,
    cards: cardsReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))
export type AppStateType = ReturnType<typeof rootReducer>
export const useAppSelector: TypedUseSelectorHook<AppStateType> = useSelector