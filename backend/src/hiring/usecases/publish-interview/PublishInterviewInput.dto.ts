import { IsNotEmpty, IsUUID } from 'class-validator';

export class PublishInterviewInput {
  @IsUUID()
  @IsNotEmpty()
  interviewId: string;
  @IsUUID()
  @IsNotEmpty()
  panelistId: string;
}
