// import { Test, TestingModule } from '@nestjs/testing'
// import { UsersController } from '../users.controller'
// import { UsersService } from '../users.service'
// import { PackagesService } from 'src/packages/packages.service'
// import { User, UserSchema } from '../schema/users.schema'
// import { MongooseModule } from '@nestjs/mongoose'
// import { Package, PackageSchema } from 'src/packages/schema/packages.schema'
// import { PackagesController } from 'src/packages/packages.controller'

// describe('UsersController', () => {
// 	let controller: UsersController

// 	beforeEach(async () => {
// 		const module: TestingModule = await Test.createTestingModule({
// 			controllers: [UsersController, PackagesController],
// 			providers:[UsersService, PackagesService],
// 			imports: [
//         MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
// 				MongooseModule.forFeature([{ name: Package.name, schema: PackageSchema }]),
//         // Otros módulos e importaciones...
//       ],
// 		}).compile()

// 		controller = module.get<UsersController>(UsersController)
// 	})

// 	// it('should be defined', () => {
// 	// 	expect(controller).toBeDefined()
// 	// })
// 	describe('getHello', () => {
// 		it('should return "Hello, NestJS!"', () => {
// 		  expect(controller.getHello()).toBe('Hello, NestJS!');
// 		});
// 	})
// })
