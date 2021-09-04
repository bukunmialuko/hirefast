import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/@shared/core/UseCase';
import { AddCandidateInput } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';
import { AddQuestionResponse } from 'src/hiring/usecases/add-question/AddQuestionResponse.dto';

@Injectable()
export class AddCandidateUseCase extends UseCase<
  AddCandidateInput,
  AddQuestionResponse
> {
  run(dto: AddCandidateInput): Promise<AddQuestionResponse> {
    return Promise.resolve(undefined);
  }
}
