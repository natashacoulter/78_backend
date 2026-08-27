import { Injectable } from '@nestjs/common';
import { ArticleRepository } from './article.repository';

@Injectable()
export class ArticleService {
  constructor(private readonly articleRepo: ArticleRepository) {}

  findAll() {
    return this.articleRepo.findAll();
  }
}
