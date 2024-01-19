import { ROLES } from 'src/constants/roles'
import { IUser } from 'src/users/user.interface'
export declare class UsersEntity implements IUser {
	_id: string
	name: string
	lastName: string
	userName: string
	email: string
	username: string
	password: string
	role: ROLES
	rejectedDeclarationTime: Date
}
