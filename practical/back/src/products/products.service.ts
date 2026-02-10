import { Injectable, BadRequestException } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { QueryProductDto } from './dto/query-product.dto';
import { runInTransaction } from '../../database/transaction.util';

@Injectable()
export class ProductsService {
  constructor(private readonly dataSource: DataSource) {}

  async create(dto: CreateProductDto) {
    try {
      return await runInTransaction(this.dataSource, async (qr) => {
        const result = await qr.query(
          `
          INSERT INTO products (name, description, quantity)
          VALUES (?, ?, ?)
          `,
          [dto.name, dto.description, dto.quantity],
        );

        const productId = result.insertId;

        if (dto.categories?.length) {
          const values = dto.categories
            .map((cid) => `(${productId}, ${cid})`)
            .join(',');

          await qr.query(
            `
            INSERT INTO product_categories (product_id, category_id)
            VALUES ${values}
            `,
          );
        }

        return { message: 'Product created successfully', productId };
      });
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async findAll(query: QueryProductDto) {
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 10;
    const offset = (page - 1) * limit;

    let where = '1=1';
    const params: any[] = [];

    if (query.search) {
      where += ' AND p.name LIKE ?';
      params.push(`%${query.search}%`);
    }

    if (query.categories) {
      const ids = query.categories.split(',').map(Number);
      where += ` AND pc.category_id IN (${ids.join(',')})`;
    }

    const data = await this.dataSource.query(
      `
      SELECT DISTINCT
        p.id,
        p.name,
        p.created_at,
        GROUP_CONCAT(c.name SEPARATOR ', ') AS categories
      FROM products p
      LEFT JOIN product_categories pc ON pc.product_id = p.id
      LEFT JOIN categories c ON c.id = pc.category_id
      WHERE ${where}
      GROUP BY p.id
      ORDER BY p.created_at DESC
      LIMIT ? OFFSET ?
      `,
      [...params, limit, offset],
    );

    const total = await this.dataSource.query(
      `
      SELECT COUNT(DISTINCT p.id) AS total
      FROM products p
      LEFT JOIN product_categories pc ON pc.product_id = p.id
      WHERE ${where}
      `,
      params,
    );

    return {
      data,
      page,
      total: total[0].total,
      lastPage: Math.ceil(total[0].total / limit),
    };
  }

  
  async delete(id: number) {
    try {
      await this.dataSource.query(
      `DELETE FROM products WHERE id = ?`,
      [id],
    );
    return { message: 'Product deleted successfully' };
    } catch (error) {
      return error
    }
  }
}
