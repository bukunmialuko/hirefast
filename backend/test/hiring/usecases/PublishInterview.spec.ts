import { Test, TestingModule } from '@nestjs/testing';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { Interview } from 'src/hiring/domain/interview/Interview';
import { Question } from 'src/hiring/domain/interview/Question';

describe('AddQuestion(UseCase)', () => {
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
