
## Базовая идея

Вместо DTO на `class-validator` используешь Zod-сxему:

```ts
import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  age: z.number().int().positive(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
```

---

## Zod Pipe для NestJS

Создаём pipe:

```ts
import {
  PipeTransform,
  Injectable,
  BadRequestException,
} from "@nestjs/common";
import { ZodSchema } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      throw new BadRequestException(result.error.format());
    }

    return result.data;
  }
}
```

---

## Использование в Controller

```ts
import { Body, Controller, Post } from "@nestjs/common";

@Controller("users")
export class UsersController {
  @Post()
  create(
    @Body(new ZodValidationPipe(CreateUserSchema))
    body: CreateUserDto,
  ) {
    return body;
  }
}
```

---

## Что происходит

1. Nest получает JSON из body
2. `@Body()` передаёт его в pipe
3. `ZodValidationPipe` вызывает `schema.safeParse()`
4. Если ошибка → `400 Bad Request`
5. Если успех → возвращается уже провалидированный объект

---

## Важный момент с number

HTTP body часто приходит так:

```json
{
  "age": "25"
}
```

а `z.number()` ждёт number, а не string.

Тогда используют:

```ts
age: z.coerce.number().int().positive()
```

Вот так:

```ts
const Schema = z.object({
  age: z.coerce.number(),
});
```

---
