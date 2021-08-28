import { HttpException, HttpStatus } from '@nestjs/common';

export class InterviewIsDeletedError extends HttpException {
  constructor() {
    super(
      {
        message: 'Interview is deleted',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
