export default class CreateCardCommand {
  constructor(
    private deckId: number,
    private question: string,
    private content: object,
    private templateType: number,
    private tagIds: number[],
  ) {}

  public getDeckId(): number {
    return this.deckId;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getContent(): object {
    return this.content;
  }

  public getTemplateType(): number {
    return this.templateType;
  }

  public getTagIds(): number[] {
    return this.tagIds;
  }
}
