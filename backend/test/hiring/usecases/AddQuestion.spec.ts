import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedError } from 'src/@shared/errors/UnauthorizedError';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import {
  Interview,
  InterviewStatus,
} from 'src/hiring/domain/interview/Interview';
import { Question } from 'src/hiring/domain/interview/Question';
import { AddQuestionUseCase } from 'src/hiring/usecases/add-question/AddQuestion.usecase';
import { AddQuestionInput } from 'src/hiring/usecases/add-question/AddQuestionInput.dto';
import { InterviewIsArchivedError } from 'src/hiring/usecases/add-question/InterviewIsArchived.error';
import { InterviewIsDeletedError } from 'src/hiring/usecases/add-question/InterviewIsDeleted.error';
import { InterviewIsPublishedError } from 'src/hiring/usecases/add-question/InterviewIsPublished.error';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';
import {
  MockAddQuestionInput,
  MockInterview,
  MockQuestion,
} from 'test/hiring/mocks/factories';

describe('AddQuestion(UseCase)', () => {
  let addQuestionUseCase;

  const interviewsRepository = {
    save: (interview: Interview) => undefined,
    findById: (id: string) => undefined,
    addQuestion: (interviewId: string, question: Question) => undefined,
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

  const addQuestion = (input: AddQuestionInput) => {
    return addQuestionUseCase.run(input);
  };

  const assertIfSearchedForInterviewId = (id: string) => {
    expect(interviewsRepository.findById).toHaveBeenCalledWith(id);
  };

  const assertIfQuestionIsAdded = (interviewId: string, question: Question) => {
    expect(interviewsRepository.addQuestion).toHaveBeenCalledWith(
      interviewId,
      question,
    );
  };

  const assertIfQuestionCreated = (input: AddQuestionInput) => {
    expect(Question.create).toHaveBeenCalledWith(input);
  };

  describe('when interview id is not found', () => {
    let addQuestionInput;

    const mockPanelistId = 'sajkdfasjdfkl;asjdfsd';
    const mockInterviewId = 'asdkjfskl;adjfkl;jsadkl;fj;lsadf';

    beforeEach(() => {
      addQuestionInput = MockAddQuestionInput({
        panelistId: mockPanelistId,
        interviewId: mockInterviewId,
      });
      jest.spyOn(interviewsRepository, 'findById').mockResolvedValue(undefined);
    });

    it('should throw error', async () => {
      await expect(addQuestion(addQuestionInput)).rejects.toThrowError(
        new InvalidInterviewIdError(),
      );
      assertIfSearchedForInterviewId(mockInterviewId);
    });
  });

  describe('when interview id is found', () => {
    describe("and when panelistId in input doesn't matches with panelistId in Interview", () => {
      let mockAddQuestionInput;
      let mockInterview;
      const mockPanelistId = 'sajkdfasjdfkl;asjdfsd';
      const mockInterviewId = 'asdkjfskl;adjfkl;jsadkl;fj;lsadf';

      beforeEach(() => {
        mockAddQuestionInput = MockAddQuestionInput({
          panelistId: mockPanelistId,
          interviewId: mockInterviewId,
        });
        mockInterview = MockInterview({
          panelistId: 'jadslkvjl;sdfjgbl;fjgiujoisfdjbljdlkfg',
          id: mockInterviewId,
          status: InterviewStatus.PUBLISHED,
        });
        jest
          .spyOn(interviewsRepository, 'findById')
          .mockResolvedValue(mockInterview);
      });

      it('should throw error', async () => {
        await expect(addQuestion(mockAddQuestionInput)).rejects.toThrowError(
          new UnauthorizedError(),
        );
        assertIfSearchedForInterviewId(mockInterviewId);
      });
    });

    describe('and when panelistId in input matches with panelistId in Interview', () => {
      let mockAddQuestionInput;
      let mockInterview;
      const mockPanelistId = 'sajkdfasjdfkl;asjdfsd';
      const mockInterviewId = 'asdkjfskl;adjfkl;jsadkl;fj;lsadf';

      beforeEach(() => {
        mockAddQuestionInput = MockAddQuestionInput({
          panelistId: mockPanelistId,
          interviewId: mockInterviewId,
        });
      });

      describe('and interview status is PUBLISHED', () => {
        beforeEach(() => {
          mockInterview = MockInterview({
            panelistId: mockPanelistId,
            id: mockInterviewId,
            status: InterviewStatus.PUBLISHED,
          });
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(mockInterview);
        });

        it('should throw an error', async () => {
          await expect(addQuestion(mockAddQuestionInput)).rejects.toThrowError(
            new InterviewIsPublishedError(),
          );
          assertIfSearchedForInterviewId(mockInterviewId);
        });
      });

      describe('and interview status is ARCHIVED', () => {
        beforeEach(() => {
          mockInterview = MockInterview({
            panelistId: mockPanelistId,
            id: mockInterviewId,
            status: InterviewStatus.ARCHIVED,
          });
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(mockInterview);
        });

        it('should throw an error', async () => {
          await expect(addQuestion(mockAddQuestionInput)).rejects.toThrowError(
            new InterviewIsArchivedError(),
          );
          assertIfSearchedForInterviewId(mockInterviewId);
        });
      });

      describe('and interview status is DELETED', () => {
        beforeEach(() => {
          mockInterview = MockInterview({
            panelistId: mockPanelistId,
            id: mockInterviewId,
            status: InterviewStatus.DELETED,
          });
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(mockInterview);
        });

        it('should throw an error', async () => {
          await expect(addQuestion(mockAddQuestionInput)).rejects.toThrowError(
            new InterviewIsDeletedError(),
          );
          assertIfSearchedForInterviewId(mockInterviewId);
        });
      });

      describe('and interview status is DRAFT', () => {
        let mockQuestion;
        let mockInterviewAfterQuestionAdded;
        beforeEach(() => {
          mockQuestion = MockQuestion();
          mockInterview = MockInterview({
            panelistId: mockPanelistId,
            id: mockInterviewId,
            status: InterviewStatus.DRAFT,
          });

          const nextSeq = mockInterview.questions.length + 1;
          const updatedQuestions = [
            ...mockInterview.questions,
            { ...mockQuestion, sequenceNumber: nextSeq },
          ];

          mockInterviewAfterQuestionAdded = MockInterview({
            panelistId: mockPanelistId,
            id: mockInterviewId,
            status: InterviewStatus.DRAFT,
            questions: updatedQuestions,
          });
          jest
            .spyOn(interviewsRepository, 'findById')
            .mockResolvedValue(mockInterview);
          jest.spyOn(Question, 'create').mockReturnValue(mockQuestion);
          jest
            .spyOn(interviewsRepository, 'addQuestion')
            .mockResolvedValue(mockInterviewAfterQuestionAdded);
        });

        afterEach(() => {
          assertIfSearchedForInterviewId(mockInterviewId);
        });

        it('should create question with default sequence number', async () => {
          await addQuestion(mockAddQuestionInput);
          assertIfQuestionCreated(mockAddQuestionInput);
        });

        it('should add question to interview', async () => {
          await addQuestion(mockAddQuestionInput);
          assertIfQuestionIsAdded(mockInterviewId, mockQuestion);
        });

        it('should return updated interview with response', async () => {
          const response = await addQuestion(mockAddQuestionInput);
          expect(response.interview).toEqual(mockInterviewAfterQuestionAdded);
        });
      });
    });
  });
});
