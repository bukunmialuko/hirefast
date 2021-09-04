import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/@shared/core/UseCase';
import { AddCandidateInputDto } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';

@Injectable()
export class AddCandidateUseCase extends UseCase<AddCandidateInputDto, any> {
  run(dto: AddCandidateInputDto): Promise<any> {
    return Promise.resolve(undefined);
  }
}
