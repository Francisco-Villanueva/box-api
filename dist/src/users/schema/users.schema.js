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
exports.UserSchema = exports.User = void 0
const mongoose_1 = require('@nestjs/mongoose')
const carrierStatus_1 = require('../../constants/carrierStatus')
const mongoose = require('mongoose')
let User = class User {}
exports.User = User
__decorate(
	[(0, mongoose_1.Prop)({ required: true }), __metadata('design:type', String)],
	User.prototype,
	'name',
	void 0
)
__decorate(
	[(0, mongoose_1.Prop)({ required: true }), __metadata('design:type', String)],
	User.prototype,
	'lastName',
	void 0
)
__decorate(
	[
		(0, mongoose_1.Prop)({
			required: true,
			unique: true,
		}),
		__metadata('design:type', String),
	],
	User.prototype,
	'userName',
	void 0
)
__decorate(
	[
		(0, mongoose_1.Prop)({
			unique: true,
			required: true,
			match: /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/,
		}),
		__metadata('design:type', String),
	],
	User.prototype,
	'email',
	void 0
)
__decorate(
	[(0, mongoose_1.Prop)({ required: false }), __metadata('design:type', String)],
	User.prototype,
	'image',
	void 0
)
__decorate(
	[(0, mongoose_1.Prop)({ required: true }), __metadata('design:type', String)],
	User.prototype,
	'password',
	void 0
)
__decorate(
	[
		(0, mongoose_1.Prop)({ required: false, default: 'CARRIER' }),
		__metadata('design:type', String),
	],
	User.prototype,
	'role',
	void 0
)
__decorate(
	[
		(0, mongoose_1.Prop)({
			required: false,
			enum: carrierStatus_1.CARRIER_STATUS,
			default: carrierStatus_1.CARRIER_STATUS.HABILITADO,
		}),
		__metadata('design:type', String),
	],
	User.prototype,
	'status',
	void 0
)
__decorate(
	[
		(0, mongoose_1.Prop)({ required: false, default: undefined }),
		__metadata('design:type', Date),
	],
	User.prototype,
	'rejectedDeclarationTime',
	void 0
)
__decorate(
	[
		(0, mongoose_1.Prop)([
			{ type: mongoose.Schema.Types.ObjectId, ref: 'Package' },
		]),
		__metadata('design:type', Array),
	],
	User.prototype,
	'packages',
	void 0
)
exports.User = User = __decorate([(0, mongoose_1.Schema)()], User)
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User)
//# sourceMappingURL=users.schema.js.map
