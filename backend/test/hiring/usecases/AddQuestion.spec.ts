import { Test, TestingModule } from '@nestjs/testing';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { Interview } from 'src/hiring/domain/interview/Interview';
import { AddQuestionUseCase } from 'src/hiring/usecases/add-question/AddQuestion.usecase';
import { AddQuestionInput } from 'src/hiring/usecases/add-question/AddQuestionInput.dto';
import { InvalidInterviewIdError } from 'src/hiring/usecases/add-question/InvalidInterviewId.error';
import { MockAddQuestionInput } from 'test/hiring/mocks/factories';

describe('AddQuestion(UseCase)', () => {
  let addQuestionUseCase;

  const interviewsRepository = {
    save: (interview: Interview) => undefined,
    findById: (id: string) => undefined,
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
});
