import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/HasValue';
import { isNullOrUndefined } from 'src/@shared/core/IsNullOrUndefined';
import { UseCase } from 'src/@shared/core/UseCase';
import { UnauthorizedError } from 'src/@shared/errors/UnauthorizedError';
import {
  IInterviewsRepository,
  INTERVIEWS_REPOSITORY,
} from 'src/hiring/details/IInterviewsRepository';
import { Candidate } from 'src/hiring/domain/interview/Candidate';
import { InterviewStatus } from 'src/hiring/domain/interview/Interview';
import { AddCandidateInput } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';
import { AddCandidateResponse } from 'src/hiring/usecases/add-candidate/AddCandidateResponse.dto';
import { CandidateAlreadyAddedError } from 'src/hiring/usecases/add-candidate/CandidateAlreadyAdded.error';
import { InterviewIsNotPublishedError } from 'src/hiring/usecases/add-candidate/InterviewIsNotPublished.error';
import { InterviewIsArchivedError } from 'src/hiring/usecases/add-question/InterviewIsArchived.error';
import { InterviewIsDeletedError } from 'src/hiring/usecases/add-question/InterviewIsDeleted.error';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';

const MAP_STATUS_TO_ERROR = {
  [InterviewStatus.DELETED]: InterviewIsDeletedError,
  [InterviewStatus.DRAFT]: InterviewIsNotPublishedError,
  [InterviewStatus.ARCHIVED]: InterviewIsArchivedError,
};

@Injectable()
export class AddCandidateUseCase extends UseCase<
  AddCandidateInput,
  AddCandidateResponse
> {
  constructor(
    @Inject(INTERVIEWS_REPOSITORY)
    private interviewsRepository: IInterviewsRepository,
  ) {
    super();
  }

  async run(input: AddCandidateInput): Promise<AddCandidateResponse> {
    const { interviewId } = input;

    const interview = await this.interviewsRepository.findById(interviewId);

    if (isNullOrUndefined(interview)) {
      throw new InvalidInterviewIdError();
    }

    if (interview.panelistId !== input.panelistId) {
      throw new UnauthorizedError();
    }

    const InvalidStatusError = MAP_STATUS_TO_ERROR[interview.status];
    if (hasValue(InvalidStatusError)) {
      throw new InvalidStatusError();
    }

    const foundCandidate = await this.interviewsRepository.findCandidateByEmail(
      input.email,
    );

    if (hasValue(foundCandidate)) {
      throw new CandidateAlreadyAddedError();
    }

    const candidate = Candidate.create(input);

    const addedCandidate = await this.interviewsRepository.addCandidate(
      candidate,
    );

    return new AddCandidateResponse(addedCandidate);
  }
}
