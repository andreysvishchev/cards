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

export const ProfileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {
        case "PROFILE/SET_USER_DATA":{
            return {...state, ...action.payload}
        }
        default:
            return state;
    }
}

export const setUserData = (email: string, name: string, cardsCount: number, avatar: string) => {
    return {
        type: "PROFILE/SET_USER_DATA",
        payload: {email, name, cardsCount, avatar},
    } as const;
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
export type ProfileActionsType = SetUserDataType;