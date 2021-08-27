import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailNotFoundOrAlreadyVerifiedError extends HttpException {
  constructor() {
    super(
      {
        email: 'Email not found or already verified',
      },
      HttpStatus.CONFLICT,
    );
  }
}
