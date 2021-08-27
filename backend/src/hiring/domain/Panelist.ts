import { IsEmail, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class Panelist {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;
}
