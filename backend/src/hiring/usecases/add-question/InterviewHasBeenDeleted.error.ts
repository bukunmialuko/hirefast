import { HttpException, HttpStatus } from '@nestjs/common';

export class InterviewHasBeenDeletedError extends HttpException {
  constructor() {
    super(
      {
        message: 'Interview has been already deleted',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
