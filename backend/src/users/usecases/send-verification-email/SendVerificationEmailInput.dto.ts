import { IsEmail, IsNotEmpty } from 'class-validator';

export class SendVerificationEmailInput {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
