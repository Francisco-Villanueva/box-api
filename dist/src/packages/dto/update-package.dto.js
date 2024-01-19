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
Object.defineProperty(exports, '__esModule', { value: true })
exports.UpdatePackageDto = void 0
const openapi = require('@nestjs/swagger')
const class_validator_1 = require('class-validator')
class UpdatePackageDto {
	static _OPENAPI_METADATA_FACTORY() {
		return {
			address: { required: true, type: () => String },
			clientName: { required: true, type: () => String },
			weight: { required: true, type: () => Number },
			deliverDate: { required: true, type: () => String },
			status: { required: true, type: () => String },
		}
	}
}
exports.UpdatePackageDto = UpdatePackageDto
__decorate(
	[
		(0, class_validator_1.IsString)(),
		(0, class_validator_1.IsOptional)(),
		__metadata('design:type', String),
	],
	UpdatePackageDto.prototype,
	'address',
	void 0
)
__decorate(
	[
		(0, class_validator_1.IsString)(),
		(0, class_validator_1.IsOptional)(),
		__metadata('design:type', String),
	],
	UpdatePackageDto.prototype,
	'clientName',
	void 0
)
__decorate(
	[
		(0, class_validator_1.IsNumber)(),
		(0, class_validator_1.IsOptional)(),
		__metadata('design:type', Number),
	],
	UpdatePackageDto.prototype,
	'weight',
	void 0
)
__decorate(
	[
		(0, class_validator_1.IsString)(),
		(0, class_validator_1.IsOptional)(),
		__metadata('design:type', String),
	],
	UpdatePackageDto.prototype,
	'deliverDate',
	void 0
)
__decorate(
	[
		(0, class_validator_1.IsString)(),
		(0, class_validator_1.IsOptional)(),
		__metadata('design:type', String),
	],
	UpdatePackageDto.prototype,
	'status',
	void 0
)
//# sourceMappingURL=update-package.dto.js.map
