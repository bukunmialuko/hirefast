import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedError } from 'src/@shared/errors/UnauthorizedError';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { AddCandidateUseCase } from 'src/hiring/usecases/add-candidate/AddCandidate.usecase';
import { AddCandidateInput } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';
import { CandidateAlreadyAddedError } from 'src/hiring/usecases/add-candidate/CandidateAlreadyAddedError';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';
import {
  MockAddCandidateInput,
  MockCandidate,
  MockInterview,
} from 'test/hiring/mocks/factories';

describe('AddCandidate(UseCase)', () => {
  let addCandidateUseCase;

  const interviewsRepository = {
    findById: (id: string) => undefined,
    findCandidateByEmail: (email: string) => undefined,
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

  const assertIfSearchedForCandidateWithEmail = (email: string) => {
    expect(interviewsRepository.findCandidateByEmail).toHaveBeenCalledWith(
      email,
    );
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
        await expect(addCandidate(addCandidateInput)).rejects.toThrowError(
          new InvalidInterviewIdError(),
        );
        assertIfSearchedForInterviewId(addCandidateInput.interviewId);
      });
    });

    describe('when interview id found', () => {
      describe("and when panelistId in input doesn't matches with panelistId in Interview", () => {
        const interviewId = 'asfvjdlkfbvlkdajfvasdfvkasdvasdsd';
        const panelistIdInInterview =
          'asjdvlk;asjdvkl;jfjbjfjcvdfvjefbdsfbdsfgb';
        const panelistIdInInput =
          'oiogkblsdkfkvkldkfvlksdvlkdsfvkasdkfvadsfvgvsdafv';
        let addCandidateInput;
        let interview;
        beforeEach(() => {
          interview = MockInterview({
            id: interviewId,
            panelistId: panelistIdInInterview,
          });
          addCandidateInput = MockAddCandidateInput({
            interviewId: interviewId,
            panelistId: panelistIdInInput,
          });
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(interview);
        });

        it('should throw error', async () => {
          await expect(addCandidate(addCandidateInput)).rejects.toThrowError(
            new UnauthorizedError(),
          );
          assertIfSearchedForInterviewId(addCandidateInput.interviewId);
        });
      });

      describe('and when panelistId in input matches with panelistId in Interview', () => {
        const interviewId = 'asfvjdlkfbvlkdajfvasdfvkasdvasdsd';
        const panelistId = 'asjdvlk;asjdvkl;jfjbjfjcvdfvjefbdsfbdsfgb';
        let addCandidateInput;
        let interview;
        beforeEach(() => {
          interview = MockInterview({
            id: interviewId,
            panelistId: panelistId,
          });
          addCandidateInput = MockAddCandidateInput({
            interviewId: interviewId,
            panelistId: panelistId,
          });
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(interview);
        });

        describe('should check if candidate email is already present or not', () => {
          describe('when candidate email already present', () => {
            let candidate;
            beforeEach(() => {
              candidate = MockCandidate();
              jest
                .spyOn(interviewsRepository, 'findCandidateByEmail')
                .mockResolvedValue(candidate);
            });
            it('should throw error', async () => {
              await expect(
                addCandidate(addCandidateInput),
              ).rejects.toThrowError(new CandidateAlreadyAddedError());
              assertIfSearchedForCandidateWithEmail(addCandidateInput.email);
            });
          });
        });
      });
    });
  });
});
