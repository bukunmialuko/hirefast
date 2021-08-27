import { HttpException, HttpStatus } from '@nestjs/common';

export class EmailAlreadyInUseError extends HttpException {
  constructor() {
    super(
      {
        email: 'Email already in use',
      },
      HttpStatus.CONFLICT,
    );
  }
}
