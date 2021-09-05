import { HttpException, HttpStatus } from '@nestjs/common';

export class UserEmailOrPasswordDoesNotMatchError extends HttpException {
  constructor() {
    super(
      {
        message: "Email or password doesn't match",
      },
      HttpStatus.CONFLICT,
    );
  }
}
