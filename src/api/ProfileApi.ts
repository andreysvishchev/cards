import {instance} from "./instance/instance";

export const profileAPI = {
	updateData(data: UpdateDataType) {
		return instance.put<UpdateUserResponseType>('auth/me', data);
	},
}

type UpdateDataType = {
	name: string,
	avatar?: string,
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

export type SetNewPasswordType = {
	info: string,
	error: string
}

export type LoginDataType = {
	email: string,
	password: string,
	rememberMe?: boolean,
}