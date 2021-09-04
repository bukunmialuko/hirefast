import { Test, TestingModule } from '@nestjs/testing';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { AddCandidateUseCase } from 'src/hiring/usecases/add-candidate/AddCandidate.usecase';
import { AddCandidateInput } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';
import { MockAddCandidateInput } from 'test/hiring/mocks/factories';

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

  const addCandidate = (input: AddCandidateInput) => {
    return addCandidateUseCase.run(input);
  };

  const assertIfSearchedForInterviewId = (id: string) => {
    expect(interviewsRepository.findById).toBeCalledWith(id);
  };

  describe('should search for interview id', () => {
    describe('when interview id not found', () => {
      const interviewId = 'asfvjdlkfbvlkdajfvasdfvkasdvasdsd';
      let addCandidateInput;
      beforeEach(() => {
        addCandidateInput = MockAddCandidateInput({ interviewId: interviewId });
        jest.spyOn(interviewsRepository, 'findById').mockResolvedValue(null);
      });

      it('should throw error', async () => {
        await expect(addCandidate(addCandidateInput)).rejects.toThrowError();
        assertIfSearchedForInterviewId(addCandidateInput.interviewId);
      });
    });
  });
});
