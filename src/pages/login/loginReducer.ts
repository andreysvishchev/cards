import {changeAppStatus, setError} from "../../app/appReducer";
import {authAPI, LoginDataType} from "../../api/api";
import {AppThunkType} from "../../hooks/hooks";
import {setUserData} from "../profile/profileReducer";

const initState = {
    isLoggedIn: false,
}

export const loginReducer = (state: InitStateType = initState, actions: LoginActionsType): InitStateType => {
    switch (actions.type) {
        case "LOGIN/SET-IS-LOGGED-IN":{
			return {...state, isLoggedIn: actions.payload.value};
		}
        default:
            return state;
    }
}


export const setIsLoggedIn = (value: boolean) => {
    return {
        type: "LOGIN/SET-IS-LOGGED-IN",
        payload: {value},
    } as const;
}

export const logout = () => {
    return {
        type: "LOGIN/LOGOUT"
    } as const;
}


export const sendLoginData = (data: LoginDataType): AppThunkType => (dispatch) => {
    dispatch(changeAppStatus('loading'));
    authAPI.login(data)
        .then((res) => {
            if (res.statusText === "OK") {
                dispatch(setIsLoggedIn(true));
                const {email, name, publicCardPacksCount, avatar = 'ava'} = res.data;
                // аватар может быть undefined поэтому проверка
                if (avatar) {
                    dispatch(setUserData(email, name, publicCardPacksCount, avatar));
                }
            }
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error));
        })
        .finally(() => {
            dispatch(changeAppStatus('idle'));
        })
}

export const logoutTC = (): AppThunkType => async (dispatch) => {
    try {
        await authAPI.logout();
        dispatch(setIsLoggedIn(false));
    } catch (e: any) {
        dispatch(setError(e.response.data.error));
    }
}


type InitStateType = typeof initState
type SetAuthUserDataType = ReturnType<typeof setIsLoggedIn>
type LogoutType = ReturnType<typeof logout>
export type LoginActionsType = SetAuthUserDataType | LogoutType
