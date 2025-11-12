import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductCreateDto, ProductFiltersDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductReturnType, ProductType } from './product.type';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(
    @Query() filters: ProductFiltersDto,
  ): Promise<ProductReturnType[] | null> {
    return await this.productService.getAll(filters);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() data: Omit<ProductCreateDto, 'image'>,
    @UploadedFile() file: Express.Multer.File,
  ) {
    const parsedData: ProductType = {
      ...data,
      price: parseFloat(data.price),
      availability: data.availability === 'true',
      image: file.buffer,
    };

    return this.productService.create(parsedData);
  }

  @Get('/categories')
  async getCategories(): Promise<string[] | null> {
    return await this.productService.getAllCategories();
  }

  @Get(':slug')
  async getBySlug(
    @Param('slug') slug: string,
  ): Promise<ProductReturnType | null> {
    return await this.productService.getBySlug(slug);
  }

  @Get('/related/:slug/:category')
  async getRelated(
    @Param('slug') slug: string,
    @Param('category') category: string,
  ): Promise<ProductReturnType[] | null> {
    return await this.productService.getRelated(slug, category);
  }
}
