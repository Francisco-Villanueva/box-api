import { ROLES } from 'src/constants/roles'
import { IUser } from 'src/interfaces/user.interface'
import { Column, Entity } from 'typeorm'
@Entity({ name: 'users' })
export class UsersEntity implements IUser {
	@Column()
	_id: string
	@Column()
	name: string

	@Column()
	lastName: string

	@Column({ unique: true })
	userName: string

	@Column({ unique: true })
	email: string

	@Column({ unique: true })
	username: string

	@Column()
	password: string

	@Column({ type: 'enum', enum: ROLES })
	role: ROLES
}
