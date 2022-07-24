import {AppThunkType} from "../../hooks/hooks";
import {authAPI} from "../../api/api";

const initState: LoginDataType = {
    email: "",
    isAuth: false,
    error: "",
}
export const LoginReducer = (state = initState, action: LoginActionsType): LoginDataType => {
    switch (action.type) {
        case "LOGIN/SET-IS-LOGGED-IN": {
            return {...state, isAuth: action.payload.value};
        }
        default:
            return state;
    }
}


//AC
export const logout = () => {
    return {
        type: "PROFILE/LOGOUT",
    } as const;
}

export const setIsLoggedIn = (value: boolean) => {
    return {
        type: "LOGIN/SET-IS-LOGGED-IN",
        payload: {value},
    } as const;
}


//TC
export const logoutTC = (): AppThunkType => async (dispatch) => {
    try {
        await authAPI.logout();
    } catch (e: any) {
        console.log(e);
    } finally {

    }
}


//types
type LoginDataType = {
    email: string
    isAuth: boolean
    error: string
}
type LogoutType = ReturnType<typeof logout>
type SetAuthUserDataType = ReturnType<typeof setIsLoggedIn>
export type LoginActionsType = LogoutType | SetAuthUserDataType;
