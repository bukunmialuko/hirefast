import { HttpException, HttpStatus } from '@nestjs/common';

export class InterviewIsNotPublishedError extends HttpException {
  constructor() {
    super(
      {
        message: 'Interview is not published',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
