import {
  IsDateString,
  IsNotEmpty,
  IsNotEmptyObject,
  IsString,
  IsUUID,
} from 'class-validator';
import { InterviewDetails } from 'src/hiring/domain/interview/InterviewDetails';
import { QuestionsInformation } from 'src/hiring/domain/interview/QuestionsInformation';

enum InterviewStatus {
  DRAFT = 'DRAFT',
  PUBLISHED = 'PUBLISHED',
  DELETED = 'DELETED',
  ARCHIVED = 'ARCHIVED',
}

export class Interview {
  @IsUUID()
  id: string;

  @IsNotEmptyObject()
  interviewDetails: InterviewDetails;

  @IsNotEmptyObject()
  questionsInformation: QuestionsInformation;

  @IsNotEmpty()
  @IsString()
  status: InterviewStatus;

  @IsDateString()
  createdAt: string;

  @IsDateString()
  updatedAt: string;
}
