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
export const cardsApi = {}


export type RegistrationDataType = {
    email: string
    password: string
}
