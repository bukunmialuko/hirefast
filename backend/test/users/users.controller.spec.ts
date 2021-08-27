import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from 'src/users/usecases/register-user/RegisterUser.usecase';
import { RegisterUserResponse } from 'src/users/usecases/register-user/RegisterUserResponse.dto';
import { UsersController } from 'src/users/users.controller';
import { MockRegisterUserInput } from 'test/users/mocks/factories';

describe('UsersController', () => {
  let controller: UsersController;
  const registerUserUseCase = {
    run: (input) => undefined,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [RegisterUserUseCase],
    })
      .overrideProvider(RegisterUserUseCase)
      .useValue(registerUserUseCase)
      .compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should register user', async () => {
    const mockResponse = new RegisterUserResponse();
    const mockRegisterInput = MockRegisterUserInput();

    jest.spyOn(registerUserUseCase, 'run').mockResolvedValue(mockResponse);

    const response = await controller.register(mockRegisterInput);

    expect(response).toEqual(mockResponse);
  });
});
