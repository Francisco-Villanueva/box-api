'use strict'
Object.defineProperty(exports, '__esModule', { value: true })
exports.RegisterAuthDto = void 0
const openapi = require('@nestjs/swagger')
const mapped_types_1 = require('@nestjs/mapped-types')
const login_auth_dto_1 = require('./login-auth.dto')
class RegisterAuthDto extends (0, mapped_types_1.PartialType)(
	login_auth_dto_1.LoginAuthDto
) {
	static _OPENAPI_METADATA_FACTORY() {
		return {}
	}
}
exports.RegisterAuthDto = RegisterAuthDto
//# sourceMappingURL=register-auth.dto.js.map
