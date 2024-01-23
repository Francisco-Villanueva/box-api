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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const users_service_1 = require("../users/users.service");
const common_1 = require("@nestjs/common");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mailer_service_1 = require("../modules/mailer/mailer.service");
const AWS = require("aws-sdk");
let AuthService = class AuthService {
    constructor(userService, mailerService) {
        this.userService = userService;
        this.mailerService = mailerService;
    }
    async validateUser(userName, password) {
        const userByUsername = await this.userService.findBy({
            key: 'userName',
            value: userName,
        });
        const userByEmail = await this.userService.findBy({
            key: 'email',
            value: userName,
        });
        if (userByUsername) {
            const match = await bcrypt.compare(password, userByUsername.password);
            if (match)
                return userByUsername;
        }
        if (userByEmail) {
            const match = await bcrypt.compare(password, userByEmail.password);
            if (match)
                return userByEmail;
        }
        return null;
    }
    signJWT({ payload, secret, }) {
        return jwt.sign(payload, secret, { noTimestamp: true });
    }
    async generateJWT(user) {
        const getUser = await this.userService.findById(user._id.toString());
        const payload = {
            _id: getUser._id.toString(),
            name: getUser.name,
            email: getUser.email,
            lastName: getUser.lastName,
            role: getUser.role,
            status: getUser.status,
            image: getUser.image,
            userName: getUser.userName,
            rejectedDeclarationTime: getUser.rejectedDeclarationTime,
            packages: getUser.packages,
        };
        return {
            accessToken: this.signJWT({
                payload,
                secret: process.env.SECRET_PASSWORD,
            }),
            user: payload,
        };
    }
    async me(token) {
        const payload = jwt.verify(token, process.env.SECRET_PASSWORD);
        if (!payload) {
            throw new common_1.UnauthorizedException('Token invalido');
        }
        return payload;
    }
    async register(userObjectRegister) {
        const { password } = userObjectRegister;
        const hashPassword = await bcrypt.hash(password, +process.env.HASH_SALT);
        try {
            userObjectRegister = { ...userObjectRegister, password: hashPassword };
            return this.userService.create(userObjectRegister);
        }
        catch (error) {
            if (error?.code === 11000) {
                throw new common_1.ConflictException('Duplicate email or username');
            }
        }
    }
    async resetPassword(resetPasswordDto) {
        const { email } = resetPasswordDto;
        const user = await this.userService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Email no encontrado');
        }
        const resetToken = await this.generateJWT(user);
        await this.mailerService.sendEmail(user.email, resetToken);
    }
    async updatePassword(updatePasswordDto) {
        const { password, resetToken } = updatePasswordDto;
        const payload = jwt.verify(resetToken, process.env.SECRET_PASSWORD);
        if (!payload) {
            throw new common_1.UnauthorizedException('Token invalido');
        }
        const userId = payload._id.toString();
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuario no encontrado');
        }
        const hashPassword = await bcrypt.hash(password, +process.env.HASH_SALT);
        await this.userService.updatePassword(userId, hashPassword);
    }
    async uploadImageToS3(file) {
        AWS.config.update({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
            region: process.env.AWS_REGION,
        });
        const s3 = new AWS.S3();
        const bucket = process.env.AWS_BUCKET;
        if (!bucket) {
            throw new Error('Variable de entorno AWS_BUCKET no está definida.');
        }
        const params = {
            Bucket: bucket,
            Key: `images/${file.originalname}`,
            Body: file.buffer,
            ContentType: file.mimetype,
        };
        const result = await s3.upload(params).promise();
        return result.Location;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        mailer_service_1.MailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map