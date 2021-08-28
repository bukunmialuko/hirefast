import { Inject, Injectable } from '@nestjs/common';
import { hasValue } from 'src/@shared/core/has-value';
import { UseCase } from 'src/@shared/core/usecase';
import {
  IInterviewsRepository,
  INTERVIEWS_REPOSITORY,
} from 'src/hiring/details/IInterviewsRepository';
import { InterviewStatus } from 'src/hiring/domain/interview/Interview';
import { AddQuestionInput } from 'src/hiring/usecases/add-question/AddQuestionInput.dto';
import { AddQuestionResponse } from 'src/hiring/usecases/add-question/AddQuestionResponse.dto';
import { InterviewHasBeenArchivedError } from 'src/hiring/usecases/add-question/InterviewHasBeenArchived.error';
import { InterviewHasBeenPublishedError } from 'src/hiring/usecases/add-question/InterviewHasBeenPublished.error';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';

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

    if (!hasValue(interview)) {
      throw new InvalidInterviewIdError();
    }

    if (interview.status === InterviewStatus.PUBLISHED) {
      throw new InterviewHasBeenPublishedError();
    }

    if (interview.status === InterviewStatus.ARCHIVED) {
      throw new InterviewHasBeenArchivedError();
    }

    return Promise.resolve(undefined);
  }
}
