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
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserDTO } from './dto/user.dto';
import { PackagesService } from 'src/packages/packages.service';
import { AddPackageDto } from './dto/add-package.dto';
export declare class UsersController {
    private readonly usersService;
    private readonly pacakgesServices;
    constructor(usersService: UsersService, pacakgesServices: PackagesService);
    create(body: UserDTO): Promise<import("./users.module").UsersModule>;
    findAll(): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>[]>;
    findCarriers(): Promise<Omit<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>, never>[]>;
    findOne(id: string): Promise<import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    getPackages(id: string): Promise<import("../packages/schema/packages.schema").Package[]>;
    addPackage(userId: string, { packageId }: AddPackageDto): Promise<import("./schema/users.schema").User>;
    remove(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schema/users.schema").User> & import("./schema/users.schema").User & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    removePackage(userId: string, packageId: string): Promise<void>;
}
