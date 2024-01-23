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
import { Package, PackageDocument } from './schema/packages.schema';
import mongoose, { Model } from 'mongoose';
import { PackageDto } from './dto/package.dto';
import { UpdatePackageDto } from './dto/update-package.dto';
import { PackageStatus } from './constants';
import { PackagesModule } from './packages.module';
export declare class PackagesService {
    private PackageModel;
    constructor(PackageModel: Model<PackageDocument>);
    create(data: PackageDto): Promise<PackagesModule>;
    findAll(): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Package> & Package & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Package> & Package & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    findByID(id: string): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Package> & Package & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Package> & Package & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    findByStatus(status: PackageStatus): Promise<(mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Package> & Package & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Package> & Package & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>)[]>;
    update(_id: string, data: UpdatePackageDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Package> & Package & {
        _id: mongoose.Types.ObjectId;
    }> & mongoose.Document<unknown, {}, Package> & Package & {
        _id: mongoose.Types.ObjectId;
    } & Required<{
        _id: mongoose.Types.ObjectId;
    }>>;
    validateObjectId(id: string): Promise<boolean>;
}
