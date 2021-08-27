export class DateAndTime {
  public static getCurrentDateString(): string {
    return new Date().toISOString();
  }
}
