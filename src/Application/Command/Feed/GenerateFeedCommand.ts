export default class GenerateFeedCommand {
  constructor(private limit: number) {}

  public getLimit(): number {
    return this.limit;
  }
}
