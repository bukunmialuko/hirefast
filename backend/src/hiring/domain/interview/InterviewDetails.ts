import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class InterviewDetails {
  @IsString()
  @IsNotEmpty()
  jobTitle: string;

  @IsString()
  jobDescription: string;

  @IsDateString()
  deadlineDate: string;
}
