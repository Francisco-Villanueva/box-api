/// <reference types="multer" />
/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from 'src/users/users.service';
import { UsersDocument } from 'src/users/schema/users.schema';
import * as jwt from 'jsonwebtoken';
import { IAuthResponse } from 'src/auth/auth.interface';
import { UserDTO } from 'src/users/dto/user.dto';
import { ResetPasswordDto } from './dto/resetPass-auth.dto';
import { MailService } from '../modules/mailer/mailer.service';
import { UpdatePasswordDto } from './dto/updatePass-auth.dto';
export declare class AuthService {
    private readonly userService;
    private readonly mailerService;
    constructor(userService: UsersService, mailerService: MailService);
    validateUser(userName: string, password: string): Promise<import("mongoose").Document<unknown, {}, import("src/users/schema/users.schema").User> & import("src/users/schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    signJWT({ payload, secret, }: {
        payload: jwt.JwtPayload;
        secret: string;
    }): string;
    generateJWT(user: UsersDocument): Promise<IAuthResponse>;
    me(token: string): Promise<string | jwt.JwtPayload>;
    register(userObjectRegister: UserDTO): Promise<import("../users/users.module").UsersModule>;
    resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void>;
    updatePassword(updatePasswordDto: UpdatePasswordDto): Promise<void>;
    uploadImageToS3(file: Express.Multer.File): Promise<string>;
}
