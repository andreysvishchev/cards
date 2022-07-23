import axios from "axios"

export const instance = axios.create({
    baseURL: 'http://localhost:7542/2.0/',
    withCredentials: true,
})

export const authApi = {}

export const registrationApi = {
    registration(data: RegistrationDataType) {
        return instance.post(`auth/register`, data)
    }
}

export const profileAPI = {
    updateData(data: UpdateDataType) {
        return instance.put('auth/me', data)
    },
    logout() {
        return instance.delete('auth/me', {})
    },
}
export const cardsApi = {}


export type RegistrationDataType = {
    email: string
    password: string
}

type UpdateDataType = {
    name: string,
    avatar?: string,
}
