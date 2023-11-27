import { Controller, Get, Post, Body} from '@nestjs/common';
import { PackagesService } from './packages.service';
import { CreatePackageDto } from './dto/create-package.dto';

@Controller('packages')
export class PackagesController {
  constructor(private packageService: PackagesService ){}

  @Get()
  findAll(){
    return this.packageService.findAll()
  }
  
  @Post()
  create(@Body() createPackageDto: CreatePackageDto){
    return this.packageService.create(createPackageDto)
  }

}
