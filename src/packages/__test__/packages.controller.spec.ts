import { Test, TestingModule } from '@nestjs/testing'
import { PackagesController } from '../packages.controller'
import { PackagesService } from '../packages.service'
import { MongooseModule } from '@nestjs/mongoose'
import { Package, PackageSchema } from '../schema/packages.schema'

describe('PackagesController', () => {
	let controller: PackagesController

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			imports: [
				MongooseModule.forRoot(process.env.MONGO_URI),
				MongooseModule.forFeature([
					{
						name: Package.name,
						schema: PackageSchema,
					},
				]),
			],
			controllers: [PackagesController],
			providers: [PackagesService],
		}).compile()

		controller = app.get<PackagesController>(PackagesController)
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
