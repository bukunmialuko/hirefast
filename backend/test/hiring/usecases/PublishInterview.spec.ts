import { Test, TestingModule } from '@nestjs/testing';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { PublishInterviewUseCase } from 'src/hiring/usecases/publish-interview/PublishInterview.usecase';

describe('PublishInterview(UseCase)', () => {
  let publishInterviewUseCase;

  const interviewsRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PublishInterviewUseCase,
        {
          provide: INTERVIEWS_REPOSITORY,
          useValue: interviewsRepository,
        },
      ],
    }).compile();

    publishInterviewUseCase = module.get<PublishInterviewUseCase>(
      PublishInterviewUseCase,
    );
  });

  it('should be defined', () => {
    expect(publishInterviewUseCase).toBeDefined();
  });
});
