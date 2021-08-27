import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/@shared/core/usecase';

@Injectable()
export class AddQuestionUseCase extends UseCase<any, any> {}
