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
    avatar: "https://media.istockphoto.com/vectors/anonymous-vector-icon-incognito-sign-privacy-concept-human-head-with-vector-id1284693553?k=20&m=1284693553&s=612x612&w=0&h=kduGGOGCXcl0PBkoyuxXrsHyFyd-Ct4LFQeXZtJug4Y="
}

export const ProfileReducer = (state = initialState, action: ProfileActionsType): ProfileStateType => {
    switch (action.type) {

        default:
            return state;
    }
}

export const logout = () => {
    return {
        type: "PROFILE/LOGOUT",
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


type LogoutType = ReturnType<typeof logout>
export type ProfileActionsType = LogoutType;