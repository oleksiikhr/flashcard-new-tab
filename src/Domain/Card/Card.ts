import CardId from './CardId';
import CardQuestion from './CardQuestion';
import CardContent from './Content/CardContent';
import CardTemplateType from './CardTemplateType';
import CardStatistics from './CardStatistics';
import Deck from '../Deck/Deck';
import Tag from '../Tag/Tag';

export default class Card {
  constructor(
    private id: CardId | undefined,
    private deck: Deck | undefined,
    private question: CardQuestion,
    private content: CardContent,
    private templateType: CardTemplateType,
    private statistics: CardStatistics,
    private nextAt: Date,
    private seenAt: Date,
    private updatedAt: Date,
    private createdAt: Date,
    private tags: Tag[],
  ) {}

  public static create(
    deck: Deck,
    question: CardQuestion,
    content: CardContent,
    templateType: CardTemplateType,
    tags: Tag[],
  ): Card {
    return new Card(
      undefined,
      deck,
      question,
      content,
      templateType,
      CardStatistics.create(),
      new Date(),
      new Date(),
      new Date(),
      new Date(),
      tags,
    );
  }

  public setId(id: CardId): void {
    if (undefined !== this.id) {
      throw new Error('ID is already exists');
    }

    this.id = id;
  }

  public updateLastView(): void {
    this.nextAt = new Date();

    this.statistics.increaseViews();
  }

  public getId(): CardId | undefined {
    return this.id;
  }

  public getDeck(): Deck | undefined {
    return this.deck;
  }

  public getQuestion(): CardQuestion {
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

  public getNextAt(): Date {
    return this.nextAt;
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

  public getTags(): Tag[] {
    return this.tags;
  }
}
