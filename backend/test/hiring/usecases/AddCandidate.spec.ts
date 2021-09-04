import { Test, TestingModule } from '@nestjs/testing';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { AddCandidateUseCase } from 'src/hiring/usecases/add-candidate/AddCandidate.usecase';

describe('AddCandidate(UseCase)', () => {
  let addCandidateUseCase;

  const interviewsRepository = {
    findById: (id: string) => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AddCandidateUseCase,
        {
          provide: INTERVIEWS_REPOSITORY,
          useValue: interviewsRepository,
        },
      ],
    }).compile();

    addCandidateUseCase = module.get<AddCandidateUseCase>(AddCandidateUseCase);
  });

  it('should be defined', () => {
    expect(addCandidateUseCase).toBeDefined();
  });
});
