import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/@shared/core/UseCase';
import { LoginUserInput } from 'src/users/usecases/login-user/LoginUserInput.dto';
import { LoginUserResponse } from 'src/users/usecases/login-user/LoginUserResponse.dto';

@Injectable()
export class LoginUserUseCase extends UseCase<
  LoginUserInput,
  LoginUserResponse
> {
  run(dto: LoginUserInput): Promise<LoginUserResponse> {
    return Promise.resolve(undefined);
  }
}
