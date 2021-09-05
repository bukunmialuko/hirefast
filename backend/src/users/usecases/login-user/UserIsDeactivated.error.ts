import { HttpException, HttpStatus } from '@nestjs/common';

export class UserIsDeactivatedError extends HttpException {
  constructor() {
    super(
      {
        message: 'User is deactivated',
      },
      HttpStatus.CONFLICT,
    );
  }
}
