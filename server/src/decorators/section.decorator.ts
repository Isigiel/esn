import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const currentSection = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.section;
  },
);
