import { hashSync } from 'bcrypt';

export class PasswordHasher {
  static SALTS = 10;
  public static hash(plainPassword: string): string {
    return hashSync(plainPassword, this.SALTS);
  }
}
