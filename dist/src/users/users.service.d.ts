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
/// <reference types="mongoose/types/inferschematype" />
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User, UsersDocument } from './schema/users.schema';
import { UserDTO } from './dto/user.dto';
import { UsersModule } from './users.module';
export declare class UsersService {
    private UserModule;
    constructor(UserModule: Model<UsersDocument>);
    create(body: UserDTO): Promise<UsersModule>;
    findAll(): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    findCarriers(): Promise<Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>[]>;
    findById(id: string): Promise<UsersDocument>;
    findByEmail(email: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    updatePassword(id: string, password: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    addPackageToUser(userId: string, packageId: string): Promise<User>;
    remove(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    removePackage(userId: string, packageId: string): Promise<void>;
    findBy({ key, value }: {
        key: keyof UserDTO;
        value: any;
    }): Promise<mongoose.Document<unknown, {}, User> & User & {
        _id: mongoose.Types.ObjectId;
    }>;
    validateObjectId(id: string): Promise<boolean>;
}
