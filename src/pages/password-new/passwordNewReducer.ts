import {changeAppStatus} from "../../app/appReducer";
import {authAPI} from "../../api/api";
import {AppThunkType} from "../../hooks/hooks";

const initState = {
	passwordChanged: false
}

export const passwordNewReducer = (state: InitStateType = initState, actions: PasswordNewActionsType): InitStateType => {
	switch (actions.type) {
		case "SET-PASSWORD-CHANGED":{
			return {...state, passwordChanged: actions.payload.value}
		}
		default:
			return state
	}
}

export const setPasswordChanged = (value: boolean) => {
	return {
		type: "SET-PASSWORD-CHANGED",
		payload: {value},
	} as const;
}

export const sendResetPassword = (password: string, token: string):AppThunkType => (dispatch) => {
	dispatch(changeAppStatus('loading'));
	authAPI.requestNewPassword(password, token)
		.then((res) => {
			console.log(res)
			if (res.statusText === "OK") {
				dispatch(setPasswordChanged(true));
			}
		})
		.catch((res) => {
			const error = res.response ? res.response.data.error : (res.message + ', more details in the console');
			console.log('Error: ', {...error});
		})
		.finally(() => {
			dispatch(changeAppStatus('idle'));
		})
}


type InitStateType = typeof initState
type setPasswordChangedType = ReturnType<typeof setPasswordChanged>
export type PasswordNewActionsType = setPasswordChangedType
