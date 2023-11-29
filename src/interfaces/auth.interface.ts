import { ROLES } from 'src/constants/roles'
import { UsersDocument } from 'src/users/schema/users.schema'

export interface PayloadToken {
	sub: string
}

export interface AuthBody {
	userName: string
	password: string
}

export interface AuthResponse {
	accessToken: string
	user: UsersDocument
}

export interface AuthTokenResult {
	role: (typeof ROLES)[keyof typeof ROLES]

	sub: string
	iat: number
	exp: number
}

export interface IUseToken {
	role: string
	sub: string
	isExpired: boolean
}
