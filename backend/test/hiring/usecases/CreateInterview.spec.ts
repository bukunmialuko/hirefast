import { Test, TestingModule } from '@nestjs/testing';
import { CreateInterviewUseCase } from 'src/hiring/usecases/create-interview/CreateInterview.usecase';

describe('CreateInterview(UseCase)', () => {
  let createInterviewUseCase;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateInterviewUseCase],
    }).compile();

    createInterviewUseCase = module.get<CreateInterviewUseCase>(
      CreateInterviewUseCase,
    );
  });

  it('should be defined', () => {
    expect(createInterviewUseCase).toBeDefined();
  });
});
