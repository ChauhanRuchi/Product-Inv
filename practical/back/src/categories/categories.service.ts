import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(private readonly dataSource: DataSource) {}

  async findAll() {
   try {
    return await this.dataSource.query(
      `SELECT id, name FROM categories ORDER BY name`,
    );
   } catch (error) {
    return error
   }
  }
}
