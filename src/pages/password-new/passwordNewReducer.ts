import {changeAppStatus, setError} from "../../app/appReducer";
import {AppThunkType} from "../../hooks/hooks";
import {authAPI} from "../../api/AuthApi";

const initState = {
    passwordChanged: false,
}

export const passwordNewReducer = (state: InitStateType = initState, actions: PasswordNewActionsType): InitStateType => {
    switch (actions.type) {
        case "SET-PASSWORD-CHANGED": {
            return {...state, passwordChanged: actions.payload.value};
        }
        default:
            return state;
    }
}

export const setPasswordChanged = (value: boolean) => {
    return {
        type: "SET-PASSWORD-CHANGED",
        payload: {value},
    } as const;
}

export const sendResetPassword = (password: string, token: string): AppThunkType => (dispatch) => {
    dispatch(changeAppStatus('loading'));
    authAPI.requestNewPassword(password, token)
        .then((res) => {
            if (res.statusText === "OK") {
                dispatch(setPasswordChanged(true));
            }
        })
        .catch((err) => {
            dispatch(setError(err.response.data.error));
        })
        .finally(() => {
            dispatch(changeAppStatus('idle'));
        });
}


type InitStateType = typeof initState;
type setPasswordChangedType = ReturnType<typeof setPasswordChanged>;
export type PasswordNewActionsType = setPasswordChangedType;