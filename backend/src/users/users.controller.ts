import { Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from 'src/users/usecases/register-user/RegisterUser.usecase';
import { RegisterUserInput } from 'src/users/usecases/register-user/RegisterUserInput.dto';
import { RegisterUserResponse } from 'src/users/usecases/register-user/RegisterUserResponse.dto';

@Controller('users')
export class UsersController {
  constructor(private registerUserUseCase: RegisterUserUseCase) {}
  @Post('/register')
  async register(input: RegisterUserInput): Promise<RegisterUserResponse> {
    return this.registerUserUseCase.run(input);
  }
}
