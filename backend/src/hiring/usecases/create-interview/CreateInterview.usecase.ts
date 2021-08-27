import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/has-value';
import { UseCase } from 'src/@shared/core/usecase';
import {
  IInterviewsRepository,
  INTERVIEWS_REPOSITORY,
} from 'src/hiring/details/IInterviewsRepository';
import { Interview } from 'src/hiring/domain/interview/Interview';
import {
  IPanelistService,
  PANELIST_SERVICE,
} from 'src/hiring/services/IPanelistService';
import { CreateInterviewInput } from 'src/hiring/usecases/create-interview/CreateInterviewInput.dto';
import { CreateInterviewResponse } from 'src/hiring/usecases/create-interview/CreateInterviewResponse.dto';
import { InvalidPanelistIdError } from 'src/hiring/usecases/create-interview/InvalidPanelistId.error';

@Injectable()
export class CreateInterviewUseCase extends UseCase<
  CreateInterviewInput,
  CreateInterviewResponse
> {
  constructor(
    @Inject(PANELIST_SERVICE) private panelistService: IPanelistService,
    @Inject(INTERVIEWS_REPOSITORY)
    private interviewsRepository: IInterviewsRepository,
  ) {
    super();
  }

  async run(input: CreateInterviewInput): Promise<CreateInterviewResponse> {
    const panelist = await this.panelistService.findById(input.panelistId);

    if (!hasValue(panelist)) {
      throw new InvalidPanelistIdError();
    }

    const interview = Interview.create(input);

    await this.interviewsRepository.save(interview);

    return new CreateInterviewResponse(interview);
  }
}
