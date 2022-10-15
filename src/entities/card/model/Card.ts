import { CardContent } from './content/cardContentFactory';

export enum CardTemplateType {
  VOCABULARY,
}

export type CardStatistics = {
  views: number;
  clicks: number;
};

export default class Card {
  private readonly initIsActive: boolean;

  constructor(
    private id: number | undefined,
    private deckId: number,
    private question: string,
    private content: CardContent,
    private templateType: CardTemplateType,
    private statistics: CardStatistics,
    private isActive: boolean,
    private seenAt: Date,
    private updatedAt: Date,
    private createdAt: Date,
  ) {
    this.initIsActive = this.isActive;
  }

  public static create(
    deckId: number,
    question: string,
    content: CardContent,
    templateType: CardTemplateType,
    isActive = true,
  ): Card {
    return new Card(
      undefined,
      deckId,
      question,
      content,
      templateType,
      { views: 0, clicks: 0 },
      isActive,
      new Date(),
      new Date(),
      new Date(),
    );
  }

  public update(
    question: string,
    content: CardContent,
    isActive: boolean,
  ): void {
    this.question = question;
    this.content = content;
    this.isActive = isActive;
    this.updatedAt = new Date();
  }

  public isExists(): boolean {
    return undefined !== this.id;
  }

  public setId(id: number): void {
    if (this.isExists()) {
      throw new Error('ID is already exists');
    }

    this.id = id;
  }

  public getId(): number {
    if (undefined === this.id) {
      throw new Error('The ID already exists');
    }

    return this.id;
  }

  public getDeckId(): number {
    return this.deckId;
  }

  public getQuestion(): string {
    return this.question;
  }

  public getContent(): CardContent {
    return this.content;
  }

  public getTemplateType(): CardTemplateType {
    return this.templateType;
  }

  public getStatistics(): CardStatistics {
    return this.statistics;
  }

  public getIsActive(): boolean {
    return this.isActive;
  }

  public isActiveChanged(): boolean {
    return this.isActive !== this.initIsActive;
  }

  public getSeenAt(): Date {
    return this.seenAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public updateLastSeen(): void {
    this.statistics.views += 1;

    this.seenAt = new Date();
  }
}
