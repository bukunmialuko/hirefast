export abstract class UseCase<D, R> {
  abstract run(dto: D): Promise<R>;
}
