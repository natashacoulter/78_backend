import {
  Controller,
  Get,
  Headers,
  Param,
  ParseIntPipe,
  Req,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { PositiveNumberPipe } from 'src/common/pipes/positive-number.pipe';

@Controller('/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Get()
  findAll() {
    return this.articleService.findAll();
  }

  // Получение значений из заголовка
  @Get('/get-auth-header')
  getAuthHeader(@Headers('authorization') token: string) {
    return { token };
  }

  // Получение всех заголовков запроса
  @Get('/get-headers')
  getHeaders(@Headers() headers: Record<string, string>) {
    return headers;
  }

  // Получение метода запроса
  @Get('/get-request-info')
  getRequestInfo(@Req() req: Request) {
    return { method: req.method };
  }

  @Get('/:id')
  findOne(@Param('id', ParseIntPipe, PositiveNumberPipe) id: number) {
    return { id };
  }
}
