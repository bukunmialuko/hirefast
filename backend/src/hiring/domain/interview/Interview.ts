import {
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { InterviewDetails } from 'src/hiring/domain/interview/InterviewDetails';
import { Question } from 'src/hiring/domain/interview/Question';

enum InterviewStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
}

export class Interview {
  @IsUUID()
  id: string;

  @IsUUID()
  panelistId: string;

  @IsNotEmptyObject()
  interviewDetails: InterviewDetails;

  @IsNotEmptyObject()
  questions: Question[];

  @IsString()
  @IsNotEmpty()
  status: InterviewStatus;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
