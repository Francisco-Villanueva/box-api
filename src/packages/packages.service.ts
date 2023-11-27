import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Package, PackageDocument } from './schema/packages.schema';
import { Model } from 'mongoose';
import { CreatePackageDto } from './dto/create-package.dto';


@Injectable()
export class PackagesService {

  constructor(
    @InjectModel(Package.name) private PackageModel: Model<PackageDocument>,
  ) {}

  async create(createPackageDto: CreatePackageDto) {
    const createdPackage = await this.PackageModel.create(createPackageDto);
    return createdPackage;
  }

  async findAll() {
    return this.PackageModel.find();
  }

}
