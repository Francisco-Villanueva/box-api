"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const login_auth_dto_1 = require("./dto/login-auth.dto");
const user_dto_1 = require("../users/dto/user.dto");
const resetPass_auth_dto_1 = require("./dto/resetPass-auth.dto");
const updatePass_auth_dto_1 = require("./dto/updatePass-auth.dto");
const token_dto_1 = require("./dto/token.dto");
const platform_express_1 = require("@nestjs/platform-express");
const swagger_1 = require("@nestjs/swagger");
let AuthController = class AuthController {
    constructor(authService) {
        this.authService = authService;
    }
    sayHello() {
        return 'Hello Packages';
    }
    async login({ user, password }) {
        const userValidate = await this.authService.validateUser(user, password);
        if (!userValidate) {
            throw new common_1.UnauthorizedException('Data not valid');
        }
        const jwt = await this.authService.generateJWT(userValidate);
        return jwt;
    }
    registerUser(userObjectRegister) {
        return this.authService.register(userObjectRegister);
    }
    me(token) {
        return this.authService.me(token.token);
    }
    resetPassword(resetPasswordDto) {
        return this.authService.resetPassword(resetPasswordDto);
    }
    updatePassword(updatePasswordDto) {
        return this.authService.updatePassword(updatePasswordDto);
    }
    async uploadImage(file) {
        const imageUrl = await this.authService.uploadImageToS3(file);
        return { imageUrl };
    }
};
exports.AuthController = AuthController;
__decorate([
    (0, swagger_1.ApiOperation)({
        description: 'Retrieve a greeting message from the application',
    }),
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: String }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "sayHello", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Authenticate and generate JWT for user login' }),
    (0, swagger_1.ApiBody)({ type: login_auth_dto_1.LoginAuthDto }),
    (0, common_1.Post)('login'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_auth_dto_1.LoginAuthDto]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Register a new user' }),
    (0, swagger_1.ApiBody)({ type: user_dto_1.UserDTO }),
    (0, common_1.Post)('register'),
    openapi.ApiResponse({ status: 201, type: require("../users/users.module").UsersModule }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_dto_1.UserDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "registerUser", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Retrieve user information based on JWT token' }),
    (0, swagger_1.ApiBody)({ type: token_dto_1.ValidateTokenDTO }),
    (0, common_1.Post)('me'),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [token_dto_1.ValidateTokenDTO]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "me", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Reset user password' }),
    (0, swagger_1.ApiBody)({ type: resetPass_auth_dto_1.ResetPasswordDto }),
    (0, common_1.Post)('reset-password'),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [resetPass_auth_dto_1.ResetPasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "resetPassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Update user password' }),
    (0, swagger_1.ApiBody)({ type: updatePass_auth_dto_1.UpdatePasswordDto }),
    (0, common_1.Patch)('update-password'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [updatePass_auth_dto_1.UpdatePasswordDto]),
    __metadata("design:returntype", void 0)
], AuthController.prototype, "updatePassword", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Upload an image and get the S3 URL' }),
    (0, common_1.Post)('upload-image'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image')),
    openapi.ApiResponse({ status: 201 }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "uploadImage", null);
exports.AuthController = AuthController = __decorate([
    (0, swagger_1.ApiTags)('Auth'),
    (0, common_1.Controller)('auth'),
    __metadata("design:paramtypes", [auth_service_1.AuthService])
], AuthController);
//# sourceMappingURL=auth.controller.js.map