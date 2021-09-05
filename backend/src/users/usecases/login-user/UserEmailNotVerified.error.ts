import { HttpException, HttpStatus } from '@nestjs/common';

export class UserEmailNotVerifiedError extends HttpException {
  constructor() {
    super(
      {
        email: 'Email is not verified',
      },
      HttpStatus.CONFLICT,
    );
  }
}
