import { Interview } from 'src/hiring/domain/interview/Interview';

export class PublishInterviewResponse {
  status = 'ok';
  constructor(public interview: Interview) {}
}
