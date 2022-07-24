import axios from "axios"

export const instance = axios.create({
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
        return instance.post<UserResponseType>('auth/login', data)
    }
}

export const registrationApi = {
    registration(data: RegistrationDataType) {
        return instance.post(`auth/register`, data)
    }
}

export const profileAPI = {
    updateData(data: UpdateDataType) {
        return instance.put('auth/me', data);
    },
}
export const cardsApi = {}


export type RegistrationDataType = {
    email: string
    password: string
    rememberMe?: boolean
}

type UpdateDataType = {
    name: string
    avatar?: string
}

type LogoutResponseType = {
    info: string
    error: string
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
