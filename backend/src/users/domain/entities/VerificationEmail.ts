import { Email } from 'src/@shared/domain/Email';

export class VerificationEmail implements Email {
  body: string;
  to: string;
  senderProvider: string;
  title: string;

  public static create(
    to: string,
    name: string,
    code: string,
  ): VerificationEmail {
    const verificationEmail = new VerificationEmail();

    const verificationLink = `https://hirefast.com/v1/api/users/verify/${code}`;

    const body = `Hi ${name},\n
                    Please verify your email to register your account on Hirefast.
                    <a href="${verificationLink}">Click to verify</a>
                    Thanks,
                    Team Hirefast.
                  `;

    verificationEmail.to = to;
    verificationEmail.senderProvider = 'contacts@hirefast.com';
    verificationEmail.title = 'Verify your email at Hirefast!';
    verificationEmail.body = body;
    return verificationEmail;
  }
}
