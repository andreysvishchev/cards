import {changeAppStatus} from "../../app/appReducer";
import {authAPI, LoginDataType} from "../../api/api";
import {AppThunkType} from "../../hooks/hooks";

const initState = {
    isLoggedIn: false
}

export const loginReducer = (state: InitStateType = initState, actions: LoginActionsType): InitStateType => {
    switch (actions.type) {
        case "LOGIN/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: actions.payload.value}
        }
        default:
            return state
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
    dispatch(changeAppStatus('loading'))
    authAPI.login(data)
        .then((res) => {
            if (res.statusText === "OK") {
                dispatch(setIsLoggedIn(true))
            }
        })
        .catch((res) => {
            const error = res.response ? res.response.data.error : (res.message + ', more details in the console');
            console.log('Error: ', {...error})
        })
        .finally(() => {
            dispatch(changeAppStatus('idle'))
        })
}

export const logoutTC = (): AppThunkType => async (dispatch) => {
    try {
        await authAPI.logout();
        dispatch(setIsLoggedIn(false));
    } catch (e: any) {
        console.log(e);
    }
}
type InitStateType = typeof initState
type SetAuthUserDataType = ReturnType<typeof setIsLoggedIn>
type LogoutType = ReturnType<typeof logout>
export type LoginActionsType = SetAuthUserDataType | LogoutType