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
import { Product } from '@prisma/client';
import { ProductCreateDto, ProductFiltersDto } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAll(@Query() filters: ProductFiltersDto): Promise<Product[] | null> {
    return await this.productService.getAll(filters);
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: diskStorage({
        destination: './public',
        filename: (req, file, cb) => {
          const uniqueName = Date.now() + '-' + Math.round(Math.random() * 1e9);
          const fileExt = extname(file.originalname);
          cb(null, uniqueName + fileExt);
        },
      }),
    }),
  )
  async create(
    @Body() data: Omit<ProductCreateDto, 'image'>,
    @UploadedFile() file,
  ): Promise<Product | null> {
    const imageUrl = file
      ? `/uploads/${file.filename}`
      : '/uploads/default.jpg';

    const parsedData = {
      ...data,
      price: parseFloat(data.price),
      availability: data.availability === 'true',
    };

    return this.productService.create({
      ...parsedData,
      image: imageUrl,
    });
  }

  @Get('/categories')
  async getCategories(): Promise<string[] | null> {
    return await this.productService.getAllCategories();
  }

  @Get(':slug')
  async getBySlug(@Param('slug') slug: string): Promise<Product | null> {
    return await this.productService.getBySlug(slug);
  }

  @Get('/related/:slug/:category')
  async getRelated(
    @Param('slug') slug: string,
    @Param('category') category: string,
  ): Promise<Product[] | null> {
    return await this.productService.getRelated(slug, category);
  }
}
