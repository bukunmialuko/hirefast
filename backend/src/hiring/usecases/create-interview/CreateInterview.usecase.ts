import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/@shared/core/usecase';
import { CreateInterviewInput } from 'src/hiring/usecases/create-interview/CreateInterviewInput.dto';

@Injectable()
export class CreateInterviewUseCase extends UseCase<CreateInterviewInput, any> {
  async run(input: CreateInterviewInput): Promise<any> {}
}
