import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateInterviewInput {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  jobDescription: string;

  @IsDateString()
  deadlineDate: string;
}
