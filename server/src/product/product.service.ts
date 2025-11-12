import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient, Product } from '@prisma/client';
import { ProductFiltersDto, ProductType } from './dto/product.dto';
import slugify from 'slugify';

@Injectable()
export class ProductService {
  private prisma = new PrismaClient();

  async getAll(filters: ProductFiltersDto): Promise<Product[] | null> {
    const { searchQuery, categories, minPrice, maxPrice, sortByPrice } =
      filters;

    const where: Prisma.ProductWhereInput = {};

    console.log(searchQuery);
    if (searchQuery) {
      where.title = { contains: searchQuery };
    }

    if (categories && categories.length > 0) {
      where.category = { in: categories };
    }

    if (minPrice !== undefined || maxPrice !== undefined) {
      where.price = {};
      if (minPrice !== undefined) where.price.gte = minPrice;
      if (maxPrice !== undefined) where.price.lte = maxPrice;
    }

    return this.prisma.product.findMany({
      where,
      orderBy: sortByPrice ? { price: sortByPrice } : undefined,
    });
  }

  async getBySlug(slug: string): Promise<Product | null> {
    return await this.prisma.product.findUnique({ where: { slug } });
  }

  async create(data: ProductType): Promise<Product | null> {
    const slug =
      slugify(data.title, { lower: true, strict: true }) +
      '-' +
      Math.random().toString(36).substring(2, 6);
    return await this.prisma.product.create({ data: { ...data, slug } });
  }

  async getRelated(slug: string, category: string): Promise<Product[] | null> {
    return await this.prisma.product.findMany({
      where: {
        category: { equals: category },
        slug: { not: slug },
      },
      take: 4,
      orderBy: { id: 'desc' },
    });
  }

  async getAllCategories(): Promise<string[] | null> {
    const categories = await this.prisma.product.findMany({
      select: {
        category: true,
      },
      distinct: ['category'],
    });

    return categories.map((c) => c.category);
  }
}
