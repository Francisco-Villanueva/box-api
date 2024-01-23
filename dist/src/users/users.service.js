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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const users_schema_1 = require("./schema/users.schema");
let UsersService = class UsersService {
    constructor(UserModule) {
        this.UserModule = UserModule;
    }
    async create(body) {
        const userCreated = await this.UserModule.create(body);
        return userCreated;
    }
    async findAll() {
        return await this.UserModule.find().populate('packages');
    }
    async findCarriers() {
        return await this.UserModule.find({ role: 'CARRIER' }).populate('packages');
    }
    async findById(id) {
        const user = await this.UserModule.findById(id).populate('packages');
        return user;
    }
    async findByEmail(email) {
        const user = await this.UserModule.findOne({ email });
        return user;
    }
    async update(id, updateUserDto) {
        const updatedUser = this.UserModule.findByIdAndUpdate(id, updateUserDto, {
            new: true,
        });
        return updatedUser;
    }
    async updatePassword(id, password) {
        return await this.UserModule.findByIdAndUpdate(id, { password }, { new: true });
    }
    async addPackageToUser(userId, packageId) {
        return this.UserModule.findByIdAndUpdate(userId, { $push: { packages: packageId } }, { new: true }).exec();
    }
    async remove(id) {
        return this.UserModule.findByIdAndDelete(id);
    }
    async removePackage(userId, packageId) {
        const user = await this.UserModule.findById(userId);
        user.packages = user.packages.filter((pack) => pack.toString() !== packageId);
        user.save();
    }
    async findBy({ key, value }) {
        try {
            const user = await this.UserModule.findOne().where({
                [key]: value,
            });
            return user;
        }
        catch (error) { }
    }
    async validateObjectId(id) {
        const isValidId = mongoose_2.default.isValidObjectId(id);
        return isValidId;
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(users_schema_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map