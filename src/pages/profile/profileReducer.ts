import {AppThunkType} from "../../hooks/hooks";
import {setError} from "../../app/appReducer";
import {profileAPI} from "../../api/ProfileApi";

const initialState: ProfileStateType = {
    _id: "",
    email: "test@gmail.com",
    rememberMe: false,
    isAdmin: false,
    name: "test name",
    verified: false,
    publicCardPacksCount: 0,
    created: "",
    updated: "",
    __v: 0,
    token: "",
    tokenDeathTime: 0,
    avatar: "",
}

export const profileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case "PROFILE/UPDATE_USER_DATA":
        case "PROFILE/SET_USER_DATA": {
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}


export const setUserData = (email: string, name: string, publicCardPacksCount: number, avatar: string) => {
    return {
        type: "PROFILE/SET_USER_DATA",
        payload: {email, name, publicCardPacksCount, avatar},
    } as const;
}

export const updateUserData = (name: string) => {
    return {
        type: "PROFILE/UPDATE_USER_DATA",
        payload: {name},
    } as const;
}

export const updateUserInfo = (name: string): AppThunkType => async (dispatch) => {
    try {
        const response = await profileAPI.updateData({name});
        const updatedName = response.data.updatedUser.name;
        dispatch(updateUserData(updatedName));
    } catch (err: any) {
        dispatch(setError(err.response.data.error));
    }
}

type ProfileStateType = {
    _id: string
    email: string
    rememberMe: boolean
    isAdmin: boolean
    name: string
    verified: boolean
    publicCardPacksCount: number
    created: string
    updated: string
    __v: number
    token: string
    tokenDeathTime: number
    avatar: string
};
type SetUserDataType = ReturnType<typeof setUserData>
type UpdateUserDataType = ReturnType<typeof updateUserData>
export type ProfileActionsType = SetUserDataType | UpdateUserDataType;