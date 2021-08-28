import { HttpException, HttpStatus } from '@nestjs/common';

export class InterviewHasBeenPublishedError extends HttpException {
  constructor() {
    super(
      {
        message: 'Interview has been already published',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
