import { HttpException, HttpStatus } from '@nestjs/common';

export class InvalidPanelistIdError extends HttpException {
  constructor() {
    super(
      {
        panelistId: 'Invalid panelist id',
      },
      HttpStatus.CONFLICT,
    );
  }
}
