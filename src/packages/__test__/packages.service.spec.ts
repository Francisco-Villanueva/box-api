import { Test, TestingModule } from '@nestjs/testing'
import { PackagesService } from '../packages.service'
import { getModelToken } from '@nestjs/mongoose'
import { Package } from '../schema/packages.schema'
import { Model } from 'mongoose'
// import { PackageDto } from '../dto/package.dto'

describe('PackagesController', () => {
	let packageService: PackagesService
	let model: Model<Package>

	const mockPackage = [
		{
			_id: '6571e920c5cfa9c54f6149d6',
			address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
			clientName: 'Juan Rodriguez',
			weight: 5,
			deliverDate: '2023-12-14',
			status: 'NO ASIGNADO',
		},
		{
			_id: '2671e920c5cfa9c54f6149f0',
			address: 'Carlos Pellegrini 500, Buenos Aires, Argentina',
			clientName: 'Pedro Gonzalez',
			weight: 2,
			deliverDate: '2023-12-13',
			status: 'PENDIENTE',
		},
		{
			_id: '9071e920c5cfa9c54f6149p3',
			address: 'Carlos Pellegrini 800, Buenos Aires, Argentina',
			clientName: 'Juan Moralez',
			weight: 3,
			deliverDate: '2023-12-13',
			status: 'PENDIENTE',
		},
	]

	const mockPackageService = {
		findById: jest.fn(),
		find: jest.fn(),
		create: jest.fn(),
		findOneAndUpdate: jest.fn(),
	}

	beforeEach(async () => {
		const app: TestingModule = await Test.createTestingModule({
			providers: [
				PackagesService,
				{
					provide: getModelToken(Package.name),
					useValue: mockPackageService,
				},
			],
		}).compile()

		packageService = app.get<PackagesService>(PackagesService)
		model = app.get<Model<Package>>(getModelToken(Package.name))
	})

	describe('findAll', () => {
		it('should return an array of Packages', async () => {
			jest.spyOn(model, 'find').mockResolvedValue(mockPackage)
			const result = await packageService.findAll()
			expect(model.find).toHaveBeenCalled()
			expect(result).toEqual(mockPackage)
			expect(result.length).toEqual(3)
		})
	})

	describe('findById', () => {
		it('should find and return a Package by ID', async () => {
			jest.spyOn(model, 'findById').mockResolvedValue(mockPackage[2])
			const result = await packageService.findByID(mockPackage[2]._id)
			expect(model.findById).toHaveBeenCalledWith(mockPackage[2]._id)
			expect(result).toEqual(mockPackage[2])
		})
	})

	describe('findByStatus', () => {
		it('should find and return a Package by status', async () => {
			jest.spyOn(model, 'find').mockResolvedValue([mockPackage[0]])
			const result = await packageService.findByStatus(mockPackage[0].status)
			expect(model.find).toHaveBeenCalledWith({ status: mockPackage[0].status })
			expect(result).toEqual([mockPackage[0]])
		})

		it('should find and return 2 pending packages', async () => {
			jest.spyOn(model, 'find').mockResolvedValue([mockPackage[1], mockPackage[2]])
			const pendingPackages = await packageService.findByStatus('PENDIENTE')
			expect(model.find).toHaveBeenCalledWith({ status: 'PENDIENTE' })
			expect(pendingPackages).toEqual([mockPackage[1], mockPackage[2]])
			expect(pendingPackages.length).toBe(2)
		})

		it('should find and return 0 delivered packages', async () => {
			jest.spyOn(model, 'find').mockResolvedValue([])
			const deliveredPackages = await packageService.findByStatus('ENTREGADO')
			expect(model.find).toHaveBeenCalledWith({ status: 'ENTREGADO' })
			expect(deliveredPackages).toEqual([])
			expect(deliveredPackages.length).toBe(0)
		})
	})

	// describe('create', () => {
	// 	it('should create and return a Package', async () => {
	// 		const newPackage = {
	// 			_id: '6571e920c5cfa9c54f6149d6',
	// 			address: 'Carlos Pellegrini 255, Buenos Aires, Argentina',
	// 			clientName: 'Juan Rodriguez',
	// 			weight: 5,
	// 			deliverDate: '2023-12-14',
	// 			status: 'NO ASIGNADO',
	// 		}

	// 		jest.spyOn(model, 'create').mockResolvedValueOnce(mockPackage[0])
	// 		const result = await packageService.create(newPackage as PackageDto)
	// 		// expect(model.findById).toHaveBeenCalledWith(mockPackage[2]._id)
	// 		expect(result).toEqual(mockPackage[0])
	// 	})
	// })

	describe('updateByID', () => {
		xit('should update and return a Package', async () => {
			const updatedPackage = { ...mockPackage[0], status: 'PENDIENTE' }
			const newPackage = { ...mockPackage[0], status: 'PENDIENTE' }
			jest.spyOn(model, 'findOneAndUpdate').mockResolvedValueOnce(updatedPackage)
			const result = await packageService.update(mockPackage[0]._id, newPackage)
			expect(model.findOneAndUpdate).toHaveBeenCalledWith(
				{ _id: mockPackage[0]._id },
				newPackage,
				{
					returnOriginal: false,
				}
			)
			expect(result.status).toEqual(mockPackage[0].status)
		})
	})
})
