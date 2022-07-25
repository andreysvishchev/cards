import {AppThunkType} from "../hooks/hooks";
import {authAPI} from "../api/api";
import {setIsLoggedIn} from "../pages/login/loginReducer";
import {setUserData} from "../pages/profile/profileReducer";


const initState = {
    status: 'idle' as RequestStatusType,
    isInitialized: false,
}
export const appReducer = (state: InitStateType = initState, actions: AppActionsType): InitStateType => {
    switch (actions.type) {
        case 'APP/CHANGE-APP-STATUS':
            return {...state, status: actions.status};
        case "APP/SET_IS_INITIALIZED": {
            return {...state, isInitialized: actions.payload.value};
        }
        default:
            return state;
    }
}


export const changeAppStatus = (status: RequestStatusType) => {
    return {type: 'APP/CHANGE-APP-STATUS', status} as const;
}

export const setIsInitialized = (value: boolean) => {
    return {
        type: 'APP/SET_IS_INITIALIZED',
        payload: {value}
    } as const;
}


export const initializeApp = (): AppThunkType => async (dispatch) => {
    try {
        const auth = await authAPI.authMe();
        dispatch(setIsLoggedIn(true));
        const {email, name, publicCardPacksCount, avatar} = auth.data;
        // аватар может быть undefined поэтому проверка
        if (avatar) {
            dispatch(setUserData(email, name, publicCardPacksCount, avatar));
        }
    } catch (e: any) {
        throw new Error(e.response.data.error);
    } finally {
        dispatch(setIsInitialized(true));
    }
}

type InitStateType = typeof initState;
type ChangeAppStatusType = ReturnType<typeof changeAppStatus>;
type SetIsInitializedType = ReturnType<typeof setIsInitialized>;
export type AppActionsType = ChangeAppStatusType | SetIsInitializedType;
export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';