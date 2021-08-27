import { Test, TestingModule } from '@nestjs/testing';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { Interview } from 'src/hiring/domain/interview/Interview';
import { PANELIST_SERVICE } from 'src/hiring/services/IPanelistService';

describe('AddQuestion(UseCase)', () => {
  let addQuestionUseCase;

  const interviewsRepository = {
    save: (interview: Interview) => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddQuestionUseCase,
        {
          provide: INTERVIEWS_REPOSITORY,
          useValue: interviewsRepository,
        },
      ],
    }).compile();

    addQuestionUseCase = module.get<AddQuestionUseCase>(AddQuestionUseCase);
  });

  it('should be defined', () => {
    expect(addQuestionUseCase).toBeDefined();
  });
});
