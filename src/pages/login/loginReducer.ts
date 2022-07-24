import {Dispatch} from "redux";
import {authApi, LoginDataType} from "../../api/api";
import {changeAppStatus} from "../../app/appReducer";

const initState = {
	isLoggedIn: false
}
export const loginReducer = (state: InitStateType = initState, actions: LoginActionsType): InitStateType => {
  switch (actions.type) {
	  case "SET-IS-LOGGED-IN": {
		  return {...state, isLoggedIn: actions.value}
	  }
	  default:
      return state
  }
}

export const changeStatusLogin = (value: boolean) => ({type: 'SET-IS-LOGGED-IN', value} as const)

export const sendLoginData = (data: LoginDataType) => (dispatch: Dispatch) => {
	dispatch(changeAppStatus('loading'))
	authApi.login(data)
		.then((res) => {
			console.log(res);
			if (res.statusText === "OK") {
				dispatch(changeStatusLogin(true))
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
export type LoginActionsType = ReturnType<typeof changeStatusLogin>
