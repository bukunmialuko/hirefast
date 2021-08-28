import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/@shared/core/UseCase';
import { PublishInterviewInput } from 'src/hiring/usecases/publish-interview/PublishInterviewInput.dto';
import { PublishInterviewResponse } from 'src/hiring/usecases/publish-interview/PublishInterviewResponse.dto';

@Injectable()
export class PublishInterviewUseCase extends UseCase<
  PublishInterviewInput,
  PublishInterviewResponse
> {
  async run(input: PublishInterviewInput): Promise<PublishInterviewResponse> {
    return Promise.resolve(undefined);
  }
}
