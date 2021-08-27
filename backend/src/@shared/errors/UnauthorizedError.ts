import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedError extends HttpException {
  constructor() {
    super(
      {
        message: "You can't perform this action",
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
