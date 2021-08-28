import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedError } from 'src/@shared/errors/UnauthorizedError';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { InterviewStatus } from 'src/hiring/domain/interview/Interview';
import { InterviewIsArchivedError } from 'src/hiring/usecases/add-question/InterviewIsArchived.error';
import { InterviewIsDeletedError } from 'src/hiring/usecases/add-question/InterviewIsDeleted.error';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';
import { InterviewIsAlreadyPublishedError } from 'src/hiring/usecases/publish-interview/InterviewIsAlreadyPublished.error';
import { PublishInterviewUseCase } from 'src/hiring/usecases/publish-interview/PublishInterview.usecase';
import { PublishInterviewInput } from 'src/hiring/usecases/publish-interview/PublishInterviewInput.dto';
import {
  MockInterview,
  MockPublishInterviewInput,
} from 'test/hiring/mocks/factories';

describe('PublishInterview(UseCase)', () => {
  let publishInterviewUseCase;

  const interviewsRepository = {
    findById: (id: string) => undefined,
    updateInterviewStatus: (id: string, status: InterviewStatus) => undefined,
  };

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

  const publishInterview = (input: PublishInterviewInput) => {
    return publishInterviewUseCase.run(input);
  };

  const assertIfSearchedForInterview = (id: string) => {
    expect(interviewsRepository.findById).toHaveBeenCalledWith(id);
  };

  describe('when interview id is not found', () => {
    let publishInterviewInput;
    beforeEach(() => {
      publishInterviewInput = MockPublishInterviewInput();
      jest.spyOn(interviewsRepository, 'findById').mockResolvedValue(undefined);
    });

    it('should throw error', async () => {
      await expect(
        publishInterview(publishInterviewInput),
      ).rejects.toThrowError(new InvalidInterviewIdError());
      assertIfSearchedForInterview(publishInterviewInput.interviewId);
    });
  });

  describe('when interview id is found', () => {
    let publishInterviewInput;
    let mockInterview;
    beforeEach(() => {
      publishInterviewInput = MockPublishInterviewInput();
    });

    describe("and when panelistId in input doesn't matches with panelistId in Interview", () => {
      beforeEach(() => {
        mockInterview = MockInterview({
          id: 'salvla;skjdvl;sajda',
          status: InterviewStatus.PUBLISHED,
        });
        jest
          .spyOn(interviewsRepository, 'findById')
          .mockResolvedValue(mockInterview);
      });

      it('should throw error', async () => {
        await expect(
          publishInterview(publishInterviewInput),
        ).rejects.toThrowError(new UnauthorizedError());
        assertIfSearchedForInterview(publishInterviewInput.interviewId);
      });
    });

    describe('and when panelistId in input matches with panelistId in Interview', () => {
      beforeEach(() => {
        jest.clearAllMocks();
        mockInterview = MockInterview({
          id: publishInterviewInput.interviewId,
          panelistId: publishInterviewInput.panelistId,
        });
      });

      afterEach(() => {
        assertIfSearchedForInterview(publishInterviewInput.interviewId);
      });

      describe('and when interview status is published', () => {
        beforeEach(() => {
          mockInterview.status = InterviewStatus.PUBLISHED;
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(mockInterview);
        });

        it('should throw error', async () => {
          await expect(
            publishInterview(publishInterviewInput),
          ).rejects.toThrowError(new InterviewIsAlreadyPublishedError());
        });
      });

      describe('and when interview status is deleted', () => {
        beforeEach(() => {
          mockInterview.status = InterviewStatus.DELETED;
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(mockInterview);
        });

        it('should throw error', async () => {
          await expect(
            publishInterview(publishInterviewInput),
          ).rejects.toThrowError(new InterviewIsDeletedError());
          assertIfSearchedForInterview(publishInterviewInput.interviewId);
        });
      });

      describe('and when interview status is archived', () => {
        beforeEach(() => {
          mockInterview.status = InterviewStatus.ARCHIVED;
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(mockInterview);
        });

        it('should throw error', async () => {
          await expect(
            publishInterview(publishInterviewInput),
          ).rejects.toThrowError(new InterviewIsArchivedError());
        });
      });

      const assertIfInterviewStatusIsUpdated = (
        id: string,
        status: InterviewStatus,
      ) => {
        expect(interviewsRepository.updateInterviewStatus).toHaveBeenCalledWith(
          id,
          status,
        );
      };

      describe('and when interview status is draft', () => {
        let updatedInterview;
        beforeEach(() => {
          mockInterview.status = InterviewStatus.DRAFT;
          updatedInterview = MockInterview({
            id: mockInterview.id,
            panelistId: mockInterview.panelistId,
            status: InterviewStatus.PUBLISHED,
          });
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(mockInterview);
          jest
            .spyOn(interviewsRepository, 'updateInterviewStatus')
            .mockResolvedValue(updatedInterview);
        });

        it('should update status to published', async () => {
          await publishInterview(publishInterviewInput);
          assertIfInterviewStatusIsUpdated(
            mockInterview.id,
            InterviewStatus.PUBLISHED,
          );
        });

        it('should return updated interview in response', async () => {
          const response = await publishInterview(publishInterviewInput);
          expect(response.interview).toEqual(updatedInterview);
        });
      });
    });
  });
});
