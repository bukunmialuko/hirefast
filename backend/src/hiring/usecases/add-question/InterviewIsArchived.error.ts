import { HttpException, HttpStatus } from '@nestjs/common';

export class InterviewIsArchivedError extends HttpException {
  constructor() {
    super(
      {
        message: 'Interview is archived',
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
