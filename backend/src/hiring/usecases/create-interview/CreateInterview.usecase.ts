import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/has-value';
import { UseCase } from 'src/@shared/core/usecase';
import { Interview } from 'src/hiring/domain/interview/Interview';
import {
  IPanelistService,
  PANELIST_SERVICE,
} from 'src/hiring/services/IPanelistService';
import { CreateInterviewInput } from 'src/hiring/usecases/create-interview/CreateInterviewInput.dto';
import { CreateInterviewResponse } from 'src/hiring/usecases/create-interview/CreateInterviewResponse';
import { InvalidPanelistIdError } from 'src/hiring/usecases/create-interview/InvalidPanelistId.error';

@Injectable()
export class CreateInterviewUseCase extends UseCase<
  CreateInterviewInput,
  CreateInterviewResponse
> {
  constructor(
    @Inject(PANELIST_SERVICE) private panelistService: IPanelistService,
  ) {
    super();
  }

  async run(input: CreateInterviewInput): Promise<CreateInterviewResponse> {
    const panelist = await this.panelistService.findById(input.panelistId);

    if (!hasValue(panelist)) {
      throw new InvalidPanelistIdError();
    }

    return new CreateInterviewResponse({} as Interview);
  }
}
