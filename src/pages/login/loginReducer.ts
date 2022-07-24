import {Dispatch} from "redux";
import {changeAppStatus} from "../../app/appReducer";
import {authAPI, LoginDataType} from "../../api/api";
import {AppThunkType} from "../../hooks/hooks";

const initState = {
    isLoggedIn: false,
	sendEmailRecovery: false
}
export const loginReducer = (state: InitStateType = initState, actions: LoginActionsType): InitStateType => {
    switch (actions.type) {
        case "LOGIN/SET-IS-LOGGED-IN": {
            return {...state, isLoggedIn: actions.payload.value}
        }
		case "LOGIN/SET-EMAIL-SENT": {
			return {...state, sendEmailRecovery: actions.payload.value}
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

export const setEmailSent = (value: boolean) => {
	return {
		type: "LOGIN/SET-EMAIL-SENT",
		payload: {value},
	} as const;
}

export const sendLoginData = (data: LoginDataType) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
    authAPI.login(data)
        .then((res) => {
            console.log(res);
            if (res.statusText === "OK") {
                dispatch(setIsLoggedIn(true))
                const {email, name} = res.data;
           /*     dispatch(setUserInfo(email, name));*/
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
    } catch (e: any) {
        console.log(e);
    } finally {

    }
}

export const sendPasswordRecoveryData = (email: string) => (dispatch: Dispatch) => {
	dispatch(changeAppStatus('loading'))
	authAPI.requestRecoveryLink(email)
		.then((res) => {
			console.log(res);
			if (res.statusText === "OK") {
				dispatch(setEmailSent(true))
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


type InitStateType = typeof initState
type SetAuthUserDataType = ReturnType<typeof setIsLoggedIn>
type setEmailSentDataType = ReturnType<typeof setEmailSent>
export type LoginActionsType = SetAuthUserDataType | setEmailSentDataType
