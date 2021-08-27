export abstract interface Email {
  senderProvider: string;
  body: string;
  to: string;
  title: string;
}
