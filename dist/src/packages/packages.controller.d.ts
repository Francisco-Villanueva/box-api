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
import { PackagesService } from './packages.service';
import { PackageDto } from './dto/package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageStatus } from './constants';
export declare class PackagesController {
    private packageService;
    constructor(packageService: PackagesService);
    findAll(): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/packages.schema").Package> & import("./schema/packages.schema").Package & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schema/packages.schema").Package> & import("./schema/packages.schema").Package & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    findBy(id: string): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/packages.schema").Package> & import("./schema/packages.schema").Package & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schema/packages.schema").Package> & import("./schema/packages.schema").Package & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
    findByStatus(status: PackageStatus): Promise<(import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/packages.schema").Package> & import("./schema/packages.schema").Package & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schema/packages.schema").Package> & import("./schema/packages.schema").Package & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>)[]>;
    create(body: PackageDto): Promise<import("./packages.module").PackagesModule>;
    update(id: string, data: UpdatePackageDto): Promise<import("mongoose").Document<unknown, {}, import("mongoose").Document<unknown, {}, import("./schema/packages.schema").Package> & import("./schema/packages.schema").Package & {
        _id: import("mongoose").Types.ObjectId;
    }> & import("mongoose").Document<unknown, {}, import("./schema/packages.schema").Package> & import("./schema/packages.schema").Package & {
        _id: import("mongoose").Types.ObjectId;
    } & Required<{
        _id: import("mongoose").Types.ObjectId;
    }>>;
}
