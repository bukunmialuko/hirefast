import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/@shared/core/UseCase';

@Injectable()
export class AddCandidateUseCase extends UseCase<any, any> {
  run(dto: any): Promise<any> {
    return Promise.resolve(undefined);
  }
}
