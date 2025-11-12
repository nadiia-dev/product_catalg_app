import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { ProductFiltersDto } from './dto/product.dto';
import slugify from 'slugify';
import { ProductReturnType, ProductType } from './product.type';

@Injectable()
export class ProductService {
  private prisma = new PrismaClient();

  async getAll(
    filters: ProductFiltersDto,
  ): Promise<ProductReturnType[] | null> {
    const { searchQuery, categories, minPrice, maxPrice, sortByPrice } =
      filters;

    const where: Prisma.ProductWhereInput = {};

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

    const products = await this.prisma.product.findMany({
      where,
      orderBy: sortByPrice ? { price: sortByPrice } : undefined,
    });

    return products.map((product) => ({
      ...product,
      image: `data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`,
    }));
  }

  async getBySlug(slug: string): Promise<ProductReturnType | null> {
    const product = await this.prisma.product.findUnique({ where: { slug } });

    if (!product) {
      return null;
    }

    return {
      ...product,
      image: `data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`,
    };
  }

  async create(data: ProductType): Promise<ProductReturnType | null> {
    const slug =
      slugify(data.title, { lower: true, strict: true }) +
      '-' +
      Math.random().toString(36).substring(2, 6);

    const prismaData = {
      ...data,
      slug,
      image: Buffer.from(data.image),
    };

    const product = await this.prisma.product.create({ data: prismaData });

    return {
      ...product,
      image: `data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`,
    };
  }

  async getRelated(
    slug: string,
    category: string,
  ): Promise<ProductReturnType[] | null> {
    const products = await this.prisma.product.findMany({
      where: {
        category: { equals: category },
        slug: { not: slug },
      },
      take: 4,
      orderBy: { id: 'desc' },
    });

    return products.map((product) => ({
      ...product,
      image: `data:image/jpeg;base64,${Buffer.from(product.image).toString('base64')}`,
    }));
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
