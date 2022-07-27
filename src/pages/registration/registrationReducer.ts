import {Dispatch} from "redux"
import {registrationAPI, RegistrationDataType} from "../../api/api"
import {changeAppStatus} from "../../app/appReducer"


const initState = {
    send: false
}
export const registrationReducer = (state: InitStateType = initState, actions: RegistrationActionsType): InitStateType => {
    switch (actions.type) {
        case 'CHANGE-STATUS':
            return {...state, send: actions.value}
        default:
            return state
    }
}

export const changeStatusRegistration = (value: boolean) => {
    return {type: 'CHANGE-STATUS', value} as const
}

export const sendRegistrationData = (data: RegistrationDataType) => (dispatch: Dispatch) => {
    dispatch(changeAppStatus('loading'))
	registrationAPI.registration(data)
        .then((res) => {
            if (res.statusText === "Created") {
                dispatch(changeStatusRegistration(true))
            }
        })
        .finally(() => {
            dispatch(changeAppStatus('idle'))
        })
}
type InitStateType = typeof initState
export type RegistrationActionsType = ReturnType<typeof changeStatusRegistration>
