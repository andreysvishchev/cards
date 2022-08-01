import axios from "axios"

export const instance = axios.create({
    // 'https://neko-back.herokuapp.com/2.0'
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authAPI = {
    authMe() {
        return instance.post<UserResponseType>('auth/me', {});
    },
    logout() {
        return instance.delete<LogoutResponseType>('auth/me', {});
    },
    login(data: RegistrationDataType) {
        return instance.post<UserResponseType>('auth/login', data);
    },
    requestRecoveryLink(email: string) {
        return instance.post<SetNewPasswordType>('https://neko-back.herokuapp.com/2.0/auth/forgot',
            {
                email,
                from: "Cards slip 🤹🏼 <admin@gmail.com>",
                message: `<div style="background-color: lime; padding: 15px">
                            password recovery link:<a href='https://andreysvishchev.github.io/cards/#/set-new-password/$token$'> link</a>
                          </div>`
                // на gh-pages нужно будет обратно поставить /# и поменять localhost на адрес gh-pages (https://andreysvishchev.github.io/cards/#/set-new-password/$token$)
            });
    },
    requestNewPassword(password: string, resetPasswordToken: string) {
        return instance.post<SetNewPasswordType>('/auth/set-new-password', {password, resetPasswordToken});
    }
}

export const registrationAPI = {
    registration(data: RegistrationDataType) {
        return instance.post(`auth/register`, data);
    }
}

export const profileAPI = {
    updateData(data: UpdateDataType) {
        return instance.put<UpdateUserResponseType>('auth/me', data);
    },
    logout() {
        return instance.delete('auth/me', {});
    },
}

export const cardsAPI = {
    getPacks(params:GetPackRequestType) {
        return instance.get<PacksDataType>(`cards/pack`, {params: {...params}})
    },
    getCards(packId: string) {
        return instance.get(`cards/card?cardsPack_id=${packId}`)
    },
	getMinMaxCards(min: number, max: number) {
		return instance.get<PacksDataType>(`cards/pack?&min=${5}&max=${7}`)
	}
}

export type PacksOptionsStateType = {
	packName: string | null;
	min: number | null;
	max: number | null;
	sortPacks: sortPacks | null;
	page: number | null;
	pageCount: number | null;
	user_id: string | null;
};

export type GetPackRequestType = {
	packName?: string   // english - default value
	min?: number
	max?: number
	sortPacks?: string  // 0updated - default value
	page?: number
	pageCount?: number
	user_id?: string
}

export enum sortPacks {
	ASC_USER_NAME = '1user_name',
	DES_USER_NAME = '0user_name',
	ASC_NAME = '1name',
	DES_NAME = '0name',
	ASC_CARDS_COUNT = '1cardsCount',
	DES_CARDS_COUNT = '0cardsCount',
	ASC_CREATED = '1created',
	DES_CREATED = '0created',
	ASC_UPDATE = '1updated',
	DES_UPDATE = '0updated',
}

export type SetNewPasswordType = {
    info: string,
    error: string
}
export type RegistrationDataType = {
    email: string
    password: string
}
type UpdateDataType = {
    name: string,
    avatar?: string,
}
type UserResponseType = {
    _id: string
    email: string
    name: string
    avatar?: string
    publicCardPacksCount: number
    created: string
    updated: string
    isAdmin: boolean
    verified: boolean
    rememberMe: boolean
    error?: string
}
type UpdateUserResponseType = {
    updatedUser: {
        _id: string,
        email: string,
        rememberMe: boolean,
        isAdmin: boolean,
        name: string,
        verified: boolean,
        publicCardPacksCount: number,
        created: string,
        updated: string,
        __v: number,
        token: string,
        tokenDeathTime: number,
        avatar: string
    },
    token: string,
    tokenDeathTime: number
}
type LogoutResponseType = {
    info: string
    error: string
}
export type LoginDataType = {
    email: string,
    password: string,
    rememberMe?: boolean,
}
export type PacksDataType = {
    cardPacks: PackType[]
    cardPacksTotalCount: number
    maxCardsCount: number
    minCardsCount: number
    page: number
    pageCount: number
}
export type PackType = {
    cardsCount: number
    created: string
    grade: number
    more_id: string
    name: string
    path: string
    private: boolean
    rating:number
    shots: number
    type: string
    updated: string
    user_id: string
    user_name: string
    __v: number
    _id: string
}