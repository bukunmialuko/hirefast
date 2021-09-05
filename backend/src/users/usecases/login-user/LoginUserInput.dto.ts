import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

const InvalidPasswordMessage = {
  message: 'Invalid password',
};

export class LoginUserInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString(InvalidPasswordMessage)
  @MinLength(6, InvalidPasswordMessage)
  @MaxLength(30, InvalidPasswordMessage)
  password: string;
}
