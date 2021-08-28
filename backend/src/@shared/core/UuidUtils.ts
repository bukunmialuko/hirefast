import { v4 as uuid } from 'uuid';

export class UuidUtils {
  public static random(): string {
    return uuid();
  }
}
