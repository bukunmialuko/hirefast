import { HttpException, HttpStatus } from '@nestjs/common';

export class CandidateAlreadyAddedError extends HttpException {
  constructor() {
    super(
      {
        candidate: 'Candidate already been added',
      },
      HttpStatus.CONFLICT,
    );
  }
}
