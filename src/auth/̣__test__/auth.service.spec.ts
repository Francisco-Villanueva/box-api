import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken } from '@nestjs/mongoose'
//import { Model } from 'mongoose'
import { AuthService } from '../auth.service'
import { UsersService } from 'src/users/users.service'
import { MailService } from 'src/modules/mailer/mailer.service'
import { User } from 'src/users/schema/users.schema'
import { MailerModule } from '@nestjs-modules/mailer'
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { ConflictException } from '@nestjs/common'

describe('AuthService', () => {
	let authService: AuthService
	//let model: Model<User>
	let usersService: UsersService
	//let mailService: MailService

	const mockUser = {
		name: 'User',
		lastName: 'Example',
		userName: 'exampleuser',
		email: 'userexample@mail.com',
		image: 'https://boxappbucket.s3.sa-east-1.amazonaws.com/images/admin2.jpg',
		password: 'Password123',
		rejectedDeclarationTime: undefined,
	}

	const mockAuthService = {
		signJWT: jest.fn(),
		register: jest.fn(),
	}

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [
				MailerModule.forRoot({
					transport: {
						host: 'smtp.gmail.com',
						port: 465,
						secure: true,
						auth: {
							user: process.env.EMAIL_ADMIN,
							pass: process.env.PASS_ADMIN,
						},
					},
					defaults: {
						from: process.env.EMAIL_ADMIN,
					},
				}),
			],
			providers: [
				AuthService,
				UsersService,
				MailService,
				{
					provide: getModelToken(User.name),
					useValue: mockAuthService,
				},
			],
		}).compile()

		authService = app.get<AuthService>(AuthService)
		//model = app.get<Model<User>>(getModelToken(User.name))
		usersService = app.get<UsersService>(UsersService)
		//mailService = app.get<MailService>(MailService)
	})

	it('AuthService should be defined', () => {
		expect(authService).toBeDefined()
	})

	describe('signJWT', () => {
		it('Should include the payload data in the signed JWT', () => {
			const signedToken = authService.signJWT({
				payload: mockUser,
				secret: 'secret',
			})
			const decodedToken = jwt.verify(signedToken, 'secret')
			expect(decodedToken).toEqual(mockUser)
		})
	})

	describe('register', () => {
		it('Should register the new user with hashed password', async () => {
			jest.spyOn(bcrypt, 'hash').mockImplementation(async () => {
				return 'hashedPassword'
			})
			jest.spyOn(usersService, 'create').mockResolvedValueOnce(mockUser)

			const userToRegister = await authService.register(mockUser)

			expect(userToRegister).toEqual(mockUser)

			expect(bcrypt.hash).toHaveBeenCalledWith(
				mockUser.password,
				+process.env.HASH_SALT
			)
			expect(usersService.create).toHaveBeenCalledWith({
				...mockUser,
				password: 'hashedPassword',
			})
		})
		it('Should reject registration with a duplicate userName', () => {
			const duplicateUser = {
				name: 'New User',
				lastName: 'New Example',
				userName: 'exampleuser', //userName repeated
				email: 'newuserexample@mail.com',
				image: 'https://boxappbucket.s3.sa-east-1.amazonaws.com/images/admin2.jpg',
				password: 'Password123',
				rejectedDeclarationTime: undefined,
			}
			jest
				.spyOn(usersService, 'create')
				.mockRejectedValue(new ConflictException('Duplicate userName'))

			expect(authService.register(duplicateUser)).rejects.toBeInstanceOf(
				ConflictException
			)
		})
		it('Should reject registration with a duplicate userName', async () => {
			const duplicateEmail = {
				name: 'New User',
				lastName: 'New Example',
				userName: 'newexampleuser',
				email: 'userexample@mail.com', //email repeated
				image: 'https://boxappbucket.s3.sa-east-1.amazonaws.com/images/admin2.jpg',
				password: 'Password123',
				rejectedDeclarationTime: undefined,
			}
			jest
				.spyOn(usersService, 'create')
				.mockRejectedValue(new ConflictException('Duplicate userName'))

			await expect(authService.register(duplicateEmail)).rejects.toBeInstanceOf(
				ConflictException
			)
		})
	})
})
