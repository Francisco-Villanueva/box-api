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
exports.PackagesController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const packages_service_1 = require("./packages.service");
const package_dto_1 = require("./dto/package.dto");
const update_package_dto_1 = require("./dto/update-package.dto");
const constants_1 = require("./constants");
const swagger_1 = require("@nestjs/swagger");
let PackagesController = class PackagesController {
    constructor(packageService) {
        this.packageService = packageService;
    }
    async findAll() {
        try {
            return this.packageService.findAll();
        }
        catch (error) {
            throw error;
        }
    }
    async findBy(id) {
        try {
            const isValidId = await this.packageService.validateObjectId(id);
            if (!isValidId)
                throw new common_1.BadRequestException('Por favor ingresar un ID valido');
            const packageById = await this.packageService.findByID(id);
            if (!packageById)
                throw new common_1.NotFoundException('Paquete no encontrado');
            return packageById;
        }
        catch (error) {
            throw error;
        }
    }
    async findByStatus(status) {
        try {
            if (!constants_1.PACAKGE_STATUSES.includes(status))
                throw new common_1.BadRequestException('Por favor ingrear un estado válido');
            return await this.packageService.findByStatus(status);
        }
        catch (error) {
            throw error;
        }
    }
    async create(body) {
        const { address, clientName, deliverDate, weight } = body;
        try {
            if (!address || !clientName || !deliverDate || !weight) {
                throw new common_1.BadRequestException('Missing required fields');
            }
            return this.packageService.create(body);
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const isValidId = await this.packageService.validateObjectId(id);
            if (!isValidId) {
                throw new common_1.BadRequestException('Please enter a correct id');
            }
            const updatedPackage = this.packageService.update(id, data);
            if (!updatedPackage) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedPackage;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.PackagesController = PackagesController;
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'List all users' }),
    (0, common_1.Get)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [Object] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'List a specific package based on their ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the package', type: String }),
    (0, common_1.Get)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "findBy", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'List all packages with a specific status' }),
    (0, swagger_1.ApiParam)({
        name: 'status',
        description: 'Status of the package',
        enum: constants_1.PACAKGE_STATUSES,
    }),
    (0, common_1.Get)('/status/:status'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    openapi.ApiResponse({ status: common_1.HttpStatus.OK, type: [Object] }),
    __param(0, (0, common_1.Param)('status')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "findByStatus", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Create a new package' }),
    (0, swagger_1.ApiBody)({ type: package_dto_1.PackageDto }),
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: require("./packages.module").PackagesModule }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [package_dto_1.PackageDto]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOperation)({ description: 'Update a specific package based on their ID' }),
    (0, swagger_1.ApiBody)({ type: update_package_dto_1.UpdatePackageDto }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'ID of the package', type: String }),
    (0, common_1.Put)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    openapi.ApiResponse({ status: common_1.HttpStatus.CREATED, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_package_dto_1.UpdatePackageDto]),
    __metadata("design:returntype", Promise)
], PackagesController.prototype, "update", null);
exports.PackagesController = PackagesController = __decorate([
    (0, swagger_1.ApiTags)('Packages'),
    (0, common_1.Controller)('packages'),
    __metadata("design:paramtypes", [packages_service_1.PackagesService])
], PackagesController);
//# sourceMappingURL=packages.controller.js.map