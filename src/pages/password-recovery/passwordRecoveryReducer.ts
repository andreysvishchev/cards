import {changeAppStatus} from "../../app/appReducer";
import {authAPI} from "../../api/api";
import {AppThunkType} from "../../hooks/hooks";

const initState = {
	sendEmailRecovery: false
}

export const passwordRecoveryReducer = (state: InitStateType = initState, actions: PasswordRecoveryActionsType): InitStateType => {
	switch (actions.type) {
		case "LOGIN/SET-EMAIL-SENT":{
			return {...state, sendEmailRecovery: actions.payload.value}
		}
		default:
			return state
	}
}

export const setEmailSent = (value: boolean) => {
	return {
		type: "LOGIN/SET-EMAIL-SENT",
		payload: {value},
	} as const;
}

export const sendPasswordRecoveryData = (email: string): AppThunkType => (dispatch) => {
	dispatch(changeAppStatus('loading'));
	authAPI.requestRecoveryLink(email)
		.then((res) => {
			if (res.statusText === "OK") {
				dispatch(setEmailSent(true));
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
type setEmailSentDataType = ReturnType<typeof setEmailSent>
export type PasswordRecoveryActionsType = setEmailSentDataType
