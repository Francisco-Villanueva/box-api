'use strict'
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r =
				c < 3
					? target
					: desc === null
					? (desc = Object.getOwnPropertyDescriptor(target, key))
					: desc,
			d
		if (typeof Reflect === 'object' && typeof Reflect.decorate === 'function')
			r = Reflect.decorate(decorators, target, key, desc)
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i]))
					r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r
		return c > 3 && r && Object.defineProperty(target, key, r), r
	}
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === 'object' && typeof Reflect.metadata === 'function')
			return Reflect.metadata(k, v)
	}
var __param =
	(this && this.__param) ||
	function (paramIndex, decorator) {
		return function (target, key) {
			decorator(target, key, paramIndex)
		}
	}
Object.defineProperty(exports, '__esModule', { value: true })
exports.PackagesService = void 0
const common_1 = require('@nestjs/common')
const mongoose_1 = require('@nestjs/mongoose')
const packages_schema_1 = require('./schema/packages.schema')
const mongoose_2 = require('mongoose')
let PackagesService = class PackagesService {
	constructor(PackageModel) {
		this.PackageModel = PackageModel
	}
	async create(data) {
		return await this.PackageModel.create(data)
	}
	async findAll() {
		return this.PackageModel.find()
	}
	async findByID(id) {
		return await this.PackageModel.findById(id)
	}
	async findByStatus(status) {
		return await this.PackageModel.find({ status })
	}
	async update(_id, data) {
		return await this.PackageModel.findOneAndUpdate({ _id }, data, {
			returnOriginal: false,
		})
	}
	async validateObjectId(id) {
		const isValidId = mongoose_2.default.isValidObjectId(id)
		return isValidId
	}
}
exports.PackagesService = PackagesService
exports.PackagesService = PackagesService = __decorate(
	[
		(0, common_1.Injectable)(),
		__param(0, (0, mongoose_1.InjectModel)(packages_schema_1.Package.name)),
		__metadata('design:paramtypes', [mongoose_2.Model]),
	],
	PackagesService
)
//# sourceMappingURL=packages.service.js.map
