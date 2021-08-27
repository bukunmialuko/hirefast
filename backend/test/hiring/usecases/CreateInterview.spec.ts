import { Test, TestingModule } from '@nestjs/testing';
import { INTERVIEWS_REPOSITORY } from 'src/hiring/details/IInterviewsRepository';
import { Interview } from 'src/hiring/domain/interview/Interview';
import { PANELIST_SERVICE } from 'src/hiring/services/IPanelistService';
import { CreateInterviewUseCase } from 'src/hiring/usecases/create-interview/CreateInterview.usecase';
import { CreateInterviewInput } from 'src/hiring/usecases/create-interview/CreateInterviewInput.dto';
import { InvalidPanelistIdError } from 'src/hiring/usecases/create-interview/InvalidPanelistId.error';
import {
  MockCreateInterviewInput,
  MockInterview,
  MockPanelist,
} from 'test/hiring/mocks/factories';

describe('CreateInterview(UseCase)', () => {
  let createInterviewUseCase;
  const panelistService = {
    findById: (id: string) => undefined,
  };
  const interviewsRepository = {
    save: (interview: Interview) => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateInterviewUseCase,
        {
          provide: PANELIST_SERVICE,
          useValue: panelistService,
        },
        {
          provide: INTERVIEWS_REPOSITORY,
          useValue: interviewsRepository,
        },
      ],
    }).compile();

    createInterviewUseCase = module.get<CreateInterviewUseCase>(
      CreateInterviewUseCase,
    );
  });

  it('should be defined', () => {
    expect(createInterviewUseCase).toBeDefined();
  });

  const createInterview = (input: CreateInterviewInput) => {
    return createInterviewUseCase.run(input);
  };

  const assertIfSearchedForPanelistId = (id: string) => {
    expect(panelistService.findById).toBeCalledWith(id);
  };

  const assertIdNewInterviewCreated = (input: CreateInterviewInput) => {
    expect(Interview.create).toBeCalledWith(input);
  };

  const assertIdNewInterviewSaved = (interview: Interview) => {
    expect(interviewsRepository.save).toBeCalledWith(interview);
  };

  describe('when panelist id is not found', () => {
    let createInterviewInput;
    const mockPanelistId = 'sajlkasdjvl;sajdfl;lfjaslk;djfkl;sadf';
    beforeEach(() => {
      createInterviewInput = MockCreateInterviewInput({
        panelistId: mockPanelistId,
      });
      jest.spyOn(panelistService, 'findById').mockResolvedValue(undefined);
    });

    it('should throw error', async () => {
      await expect(createInterview(createInterviewInput)).rejects.toThrowError(
        new InvalidPanelistIdError(),
      );
      assertIfSearchedForPanelistId(mockPanelistId);
    });
  });

  describe('when panelist id is found', () => {
    let createInterviewInput;
    const mockPanelistId = 'sajlkasdjvl;sajdfl;lfjaslk;djfkl;sadf';
    let mockPanelist;
    let mockInterview;
    beforeEach(() => {
      createInterviewInput = MockCreateInterviewInput({
        panelistId: mockPanelistId,
      });
      mockPanelist = MockPanelist({ id: mockPanelistId });
      mockInterview = MockInterview({ panelistId: mockPanelistId });
      jest.spyOn(panelistService, 'findById').mockResolvedValue(mockPanelist);
      jest.spyOn(Interview, 'create').mockReturnValue(mockInterview);
      jest.spyOn(interviewsRepository, 'save').mockResolvedValue(mockInterview);
    });

    it('should not throw error', async () => {
      await expect(
        createInterview(createInterviewInput),
      ).resolves.not.toThrowError(new InvalidPanelistIdError());
      assertIfSearchedForPanelistId(mockPanelistId);
    });

    it('should create new interview', async () => {
      await createInterview(createInterviewInput);
      assertIdNewInterviewCreated(createInterviewInput);
    });

    it('should save the interview', async () => {
      await createInterview(createInterviewInput);
      assertIdNewInterviewSaved(mockInterview);
    });
  });
});
