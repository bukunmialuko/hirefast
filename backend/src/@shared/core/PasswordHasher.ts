import { compareSync, hashSync } from 'bcrypt';

export class PasswordHasher {
  static SALTS = 10;
  public static hash(plainPassword: string): string {
    return hashSync(plainPassword, this.SALTS);
  }

  public static compare(
    plainPassword: string,
    hashedPassword: string,
  ): boolean {
    return compareSync(plainPassword, hashedPassword);
  }
}
