import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/HasValue';
import { isNullOrUndefined } from 'src/@shared/core/IsNullOrUndefined';
import { UseCase } from 'src/@shared/core/UseCase';
import { UnauthorizedError } from 'src/@shared/errors/UnauthorizedError';
import {
  IInterviewsRepository,
  INTERVIEWS_REPOSITORY,
} from 'src/hiring/details/IInterviewsRepository';
import { InterviewStatus } from 'src/hiring/domain/interview/Interview';
import { InterviewIsArchivedError } from 'src/hiring/usecases/add-question/InterviewIsArchived.error';
import { InterviewIsDeletedError } from 'src/hiring/usecases/add-question/InterviewIsDeleted.error';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';
import { InterviewIsAlreadyPublishedError } from 'src/hiring/usecases/publish-interview/InterviewIsAlreadyPublished.error';
import { PublishInterviewInput } from 'src/hiring/usecases/publish-interview/PublishInterviewInput.dto';
import { PublishInterviewResponse } from 'src/hiring/usecases/publish-interview/PublishInterviewResponse.dto';

const MAP_STATUS_TO_ERROR = {
  [InterviewStatus.PUBLISHED]: InterviewIsAlreadyPublishedError,
  [InterviewStatus.DELETED]: InterviewIsDeletedError,
  [InterviewStatus.ARCHIVED]: InterviewIsArchivedError,
};

@Injectable()
export class PublishInterviewUseCase extends UseCase<
  PublishInterviewInput,
  PublishInterviewResponse
> {
  constructor(
    @Inject(INTERVIEWS_REPOSITORY)
    private interviewsRepository: IInterviewsRepository,
  ) {
    super();
  }

  async run(input: PublishInterviewInput): Promise<PublishInterviewResponse> {
    const interviewId = input.interviewId;

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

    const updatedInterview =
      await this.interviewsRepository.updateInterviewStatus(
        interview.id,
        InterviewStatus.PUBLISHED,
      );

    return new PublishInterviewResponse(updatedInterview);
  }
}
