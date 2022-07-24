import {AppThunkType} from "../hooks/hooks";
import {authAPI} from "../api/api";
import {setIsLoggedIn} from "../pages/login/loginReducer";

const initState = {
    status: 'idle' as RequestStatusType
}
export const appReducer = (state: InitStateType = initState, actions: ActionsType): InitStateType => {
    switch (actions.type) {
        case 'CHANGE-APP-STATUS':
            return {...state, status: actions.status}
        default:
            return state
    }
}

export const changeAppStatus = (status: RequestStatusType) => {
    return {type: 'CHANGE-APP-STATUS', status} as const
}

export const initializeApp = (): AppThunkType => async (dispatch) => {
    try {
        const auth = await authAPI.authMe();
        dispatch(setIsLoggedIn(true));
    } catch (e) {

    } finally {

    }
}

type InitStateType = typeof initState
type ActionsType = ReturnType<typeof changeAppStatus>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
