import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { PagingDTO } from '../pagination';

export interface PagingQuery {
  page: number;
  limit: number;
}

export const Paging = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();

  const { page, limit } = request.query;
  return new PagingDTO(page ?? 0, limit ?? 20);
});
