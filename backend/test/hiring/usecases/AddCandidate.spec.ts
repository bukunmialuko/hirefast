import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedError } from 'src/@shared/errors/UnauthorizedError';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { Candidate } from 'src/hiring/domain/interview/Candidate';
import { InterviewStatus } from 'src/hiring/domain/interview/Interview';
import { AddCandidateUseCase } from 'src/hiring/usecases/add-candidate/AddCandidate.usecase';
import { AddCandidateInput } from 'src/hiring/usecases/add-candidate/AddCandidateInput.dto';
import { CandidateAlreadyAddedError } from 'src/hiring/usecases/add-candidate/CandidateAlreadyAdded.error';
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
    addCandidate: (candidate: Candidate) => undefined,
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

  const assertIfCandidateIsCreated = (input: AddCandidateInput) => {
    expect(Candidate.create).toHaveBeenCalledWith(input);
  };

  const assertIfNewCandidateAddedInInterview = (candidate: Candidate) => {
    expect(interviewsRepository.addCandidate).toHaveBeenCalledWith(candidate);
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
          addCandidateInput = MockAddCandidateInput({
            interviewId: interviewId,
            panelistId: panelistId,
          });
        });

        describe('when interview status is not published', () => {
          beforeEach(() => {
            interview = MockInterview({
              id: interviewId,
              panelistId: panelistId,
              status: InterviewStatus.DRAFT,
            });
            jest
              .spyOn(interviewsRepository, 'findById')
              .mockResolvedValue(interview);
          });

          it('should throw error', async () => {
            await expect(
              addCandidate(addCandidateInput),
            ).rejects.toThrowError();
            assertIfSearchedForInterviewId(addCandidateInput.interviewId);
          });
        });

        describe('when interview status is published', () => {
          beforeEach(() => {
            interview = MockInterview({
              id: interviewId,
              panelistId: panelistId,
              status: InterviewStatus.PUBLISHED,
            });
            jest
              .spyOn(interviewsRepository, 'findById')
              .mockResolvedValue(interview);
          });

          afterEach(() => {
            assertIfSearchedForInterviewId(addCandidateInput.interviewId);
          });

          describe('should search for candidate email in all interviews candidates', () => {
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

            describe('when candidate email not already present', () => {
              let candidate;
              beforeEach(() => {
                candidate = MockCandidate({
                  interviewId: interviewId,
                });
                jest
                  .spyOn(interviewsRepository, 'findCandidateByEmail')
                  .mockResolvedValue(null);
                jest.spyOn(Candidate, 'create').mockReturnValue(candidate);
                jest
                  .spyOn(interviewsRepository, 'addCandidate')
                  .mockResolvedValue(candidate);
              });

              afterEach(() => {
                assertIfSearchedForCandidateWithEmail(addCandidateInput.email);
              });

              it('should create new candidate', async () => {
                await addCandidate(addCandidateInput);
                assertIfCandidateIsCreated(addCandidateInput);
              });

              it('should add new candidate in the interview', async () => {
                await addCandidate(addCandidateInput);
                assertIfNewCandidateAddedInInterview(candidate);
              });

              it('should return added candidate in response', async () => {
                const response = await addCandidate(addCandidateInput);
                expect(response.candidate).toEqual(candidate);
              });
            });
          });
        });
      });
    });
  });
});
