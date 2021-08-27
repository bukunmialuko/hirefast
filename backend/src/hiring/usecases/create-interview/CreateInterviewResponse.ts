import { Interview } from 'src/hiring/domain/interview/Interview';

export class CreateInterviewResponse {
  status = 'ok';
  interview: Interview;
}
