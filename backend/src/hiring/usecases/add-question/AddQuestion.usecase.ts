import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/@shared/core/usecase';
import { AddQuestionInput } from 'src/hiring/usecases/add-question/AddQuestionInput.dto';
import { AddQuestionResponse } from 'src/hiring/usecases/add-question/AddQuestionResponse';

@Injectable()
export class AddQuestionUseCase extends UseCase<
  AddQuestionInput,
  AddQuestionResponse
> {}
