import { Package } from 'src/packages/schema/packages.schema'
export declare class UserDTO {
	name: string
	lastName: string
	email: string
	userName: string
	image: string
	password: string
	role?: string
	status?: string
	rejectedDeclarationTime: Date
	packages?: Package[]
}
