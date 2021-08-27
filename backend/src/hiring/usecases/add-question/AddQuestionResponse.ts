import { Interview } from 'src/hiring/domain/interview/Interview';

export class AddQuestionResponse {
  status = 'ok';
  constructor(public interview: Interview) {}
}
