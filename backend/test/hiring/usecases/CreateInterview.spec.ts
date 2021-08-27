import { Test, TestingModule } from '@nestjs/testing';
import { PANELIST_SERVICE } from 'src/hiring/services/IPanelistService';
import { CreateInterviewUseCase } from 'src/hiring/usecases/create-interview/CreateInterview.usecase';
import { CreateInterviewInput } from 'src/hiring/usecases/create-interview/CreateInterviewInput.dto';
import { InvalidPanelistIdError } from 'src/hiring/usecases/create-interview/InvalidPanelistId.error';
import { MockCreateInterviewInput } from 'test/hiring/mocks/factories';

describe('CreateInterview(UseCase)', () => {
  let createInterviewUseCase;
  const panelistService = {
    findById: (id: string) => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateInterviewUseCase,
        {
          provide: PANELIST_SERVICE,
          useValue: panelistService,
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
});
