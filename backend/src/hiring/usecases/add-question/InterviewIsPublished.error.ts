import { HttpException, HttpStatus } from '@nestjs/common';

export class InterviewIsPublishedError extends HttpException {
  constructor() {
    super(
      {
        message: 'Interview is published',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
