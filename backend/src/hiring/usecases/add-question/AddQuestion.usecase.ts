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
import { Question } from 'src/hiring/domain/interview/Question';
import { AddQuestionInput } from 'src/hiring/usecases/add-question/AddQuestionInput.dto';
import { AddQuestionResponse } from 'src/hiring/usecases/add-question/AddQuestionResponse.dto';
import { InterviewIsArchivedError } from 'src/hiring/usecases/add-question/InterviewIsArchived.error';
import { InterviewIsDeletedError } from 'src/hiring/usecases/add-question/InterviewIsDeleted.error';
import { InterviewIsPublishedError } from 'src/hiring/usecases/add-question/InterviewIsPublished.error';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';

const MAP_STATUS_TO_ERROR = {
  [InterviewStatus.DELETED]: InterviewIsDeletedError,
  [InterviewStatus.PUBLISHED]: InterviewIsPublishedError,
  [InterviewStatus.ARCHIVED]: InterviewIsArchivedError,
};

@Injectable()
export class AddQuestionUseCase extends UseCase<
  AddQuestionInput,
  AddQuestionResponse
> {
  constructor(
    @Inject(INTERVIEWS_REPOSITORY)
    private interviewsRepository: IInterviewsRepository,
  ) {
    super();
  }

  async run(input: AddQuestionInput): Promise<AddQuestionResponse> {
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

    const question = Question.create(input);

    const updatedInterview = await this.interviewsRepository.addQuestion(
      interviewId,
      question,
    );

    return new AddQuestionResponse(updatedInterview);
  }
}
