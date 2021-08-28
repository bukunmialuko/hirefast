import { HttpException, HttpStatus } from '@nestjs/common';

export class InterviewIsAlreadyPublishedError extends HttpException {
  constructor() {
    super(
      {
        message: 'Interview is already published',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
