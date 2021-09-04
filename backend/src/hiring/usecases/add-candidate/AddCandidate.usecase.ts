import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/HasValue';
import { isNullOrUndefined } from 'src/@shared/core/IsNullOrUndefined';
import { UseCase } from 'src/@shared/core/UseCase';
import { UnauthorizedError } from 'src/@shared/errors/UnauthorizedError';
import {
  IInterviewsRepository,
  INTERVIEWS_REPOSITORY,
} from 'src/hiring/details/IInterviewsRepository';
import { AddCandidateInput } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';
import { CandidateAlreadyAddedError } from 'src/hiring/usecases/add-candidate/CandidateAlreadyAddedError';
import { AddQuestionResponse } from 'src/hiring/usecases/add-question/AddQuestionResponse.dto';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';

@Injectable()
export class AddCandidateUseCase extends UseCase<
  AddCandidateInput,
  AddQuestionResponse
> {
  constructor(
    @Inject(INTERVIEWS_REPOSITORY)
    private interviewsRepository: IInterviewsRepository,
  ) {
    super();
  }

  async run(input: AddCandidateInput): Promise<AddQuestionResponse> {
    const { interviewId } = input;

    const interview = await this.interviewsRepository.findById(interviewId);

    if (isNullOrUndefined(interview)) {
      throw new InvalidInterviewIdError();
    }

    if (interview.panelistId !== input.panelistId) {
      throw new UnauthorizedError();
    }

    const foundCandidate = await this.interviewsRepository.findCandidateByEmail(
      input.email,
    );

    if (hasValue(foundCandidate)) {
      throw new CandidateAlreadyAddedError();
    }

    return Promise.resolve(undefined);
  }
}
