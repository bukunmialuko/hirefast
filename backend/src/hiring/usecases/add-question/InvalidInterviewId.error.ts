import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidInterviewIdError extends HttpException {
  constructor() {
    super(
      {
        interviewId: 'Invalid interview id',
      },
      HttpStatus.CONFLICT,
    );
  }
}
