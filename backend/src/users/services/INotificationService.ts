import { Email } from 'src/@shared/domain/Email';

export const NOTIFICATION_SERVICE = 'NOTIFICATION_SERVICE';

export interface INotificationService {
  sendEmail(email: Email): Promise<boolean>;
}
