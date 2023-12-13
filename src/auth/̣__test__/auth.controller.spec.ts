import { Test, TestingModule } from '@nestjs/testing'
import { AuthController } from '../auth.controller'
import { AuthService } from '../auth.service'

describe('PackagesController', () => {
	let controller: AuthController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			controllers: [AuthController],
			providers: [AuthService],
		}).compile()

		controller = app.get<AuthController>(AuthController)
	})

	describe('getHello', () => {
		it('should return "Hello Packages"', () => {
			expect(controller.sayHello()).toBe('Hello Packages')
		})
	})
	// describe('getPackages', () => {
	// 	it('should return all the packages', () => {
	// 		expect(controller.findAll()).toHaveLength(14)
	// 	})
	// })
})
