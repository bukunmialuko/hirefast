import { HttpException, HttpStatus } from '@nestjs/common';

export class InterviewHasBeenArchivedError extends HttpException {
  constructor() {
    super(
      {
        message: 'Interview has been already archived',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
