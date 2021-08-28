import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/HasValue';
import { isNullOrUndefined } from 'src/@shared/core/IsNullOrUndefined';
import { UseCase } from 'src/@shared/core/UseCase';
import {
  IInterviewsRepository,
  INTERVIEWS_REPOSITORY,
} from 'src/hiring/details/IInterviewsRepository';
import { InterviewStatus } from 'src/hiring/domain/interview/Interview';
import { Question } from 'src/hiring/domain/interview/Question';
import { AddQuestionInput } from 'src/hiring/usecases/add-question/AddQuestionInput.dto';
import { AddQuestionResponse } from 'src/hiring/usecases/add-question/AddQuestionResponse.dto';
import { InterviewHasBeenArchivedError } from 'src/hiring/usecases/add-question/InterviewHasBeenArchived.error';
import { InterviewHasBeenDeletedError } from 'src/hiring/usecases/add-question/InterviewHasBeenDeleted.error';
import { InterviewHasBeenPublishedError } from 'src/hiring/usecases/add-question/InterviewHasBeenPublished.error';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';

const MAP_STATUS_TO_ERROR = {
  [InterviewStatus.DELETED]: InterviewHasBeenDeletedError,
  [InterviewStatus.PUBLISHED]: InterviewHasBeenPublishedError,
  [InterviewStatus.ARCHIVED]: InterviewHasBeenArchivedError,
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
