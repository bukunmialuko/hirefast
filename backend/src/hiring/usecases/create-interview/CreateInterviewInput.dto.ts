import { IsDateString, IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateInterviewInput {
  @IsUUID()
  @IsNotEmpty()
  panelistId: string;

  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  @IsNotEmpty()
  companyName: string;

  @IsString()
  @IsNotEmpty()
  jobDescription: string;

  @IsDateString()
  @IsNotEmpty()
  deadlineDate: string;
}
