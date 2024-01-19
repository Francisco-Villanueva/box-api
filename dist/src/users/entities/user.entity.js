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
exports.UsersEntity = void 0
const openapi = require('@nestjs/swagger')
const roles_1 = require('../../constants/roles')
const typeorm_1 = require('typeorm')
let UsersEntity = class UsersEntity {
	static _OPENAPI_METADATA_FACTORY() {
		return {
			_id: { required: true, type: () => String },
			name: { required: true, type: () => String },
			lastName: { required: true, type: () => String },
			userName: { required: true, type: () => String },
			email: { required: true, type: () => String },
			username: { required: true, type: () => String },
			password: { required: true, type: () => String },
			role: { required: true, enum: require('../../constants/roles').ROLES },
			rejectedDeclarationTime: { required: true, type: () => Date },
		}
	}
}
exports.UsersEntity = UsersEntity
__decorate(
	[(0, typeorm_1.Column)(), __metadata('design:type', String)],
	UsersEntity.prototype,
	'_id',
	void 0
)
__decorate(
	[(0, typeorm_1.Column)(), __metadata('design:type', String)],
	UsersEntity.prototype,
	'name',
	void 0
)
__decorate(
	[(0, typeorm_1.Column)(), __metadata('design:type', String)],
	UsersEntity.prototype,
	'lastName',
	void 0
)
__decorate(
	[(0, typeorm_1.Column)({ unique: true }), __metadata('design:type', String)],
	UsersEntity.prototype,
	'userName',
	void 0
)
__decorate(
	[(0, typeorm_1.Column)({ unique: true }), __metadata('design:type', String)],
	UsersEntity.prototype,
	'email',
	void 0
)
__decorate(
	[(0, typeorm_1.Column)({ unique: true }), __metadata('design:type', String)],
	UsersEntity.prototype,
	'username',
	void 0
)
__decorate(
	[(0, typeorm_1.Column)(), __metadata('design:type', String)],
	UsersEntity.prototype,
	'password',
	void 0
)
__decorate(
	[
		(0, typeorm_1.Column)({ type: 'enum', enum: roles_1.ROLES }),
		__metadata('design:type', String),
	],
	UsersEntity.prototype,
	'role',
	void 0
)
__decorate(
	[(0, typeorm_1.Column)(), __metadata('design:type', Date)],
	UsersEntity.prototype,
	'rejectedDeclarationTime',
	void 0
)
exports.UsersEntity = UsersEntity = __decorate(
	[(0, typeorm_1.Entity)({ name: 'users' })],
	UsersEntity
)
//# sourceMappingURL=user.entity.js.map
