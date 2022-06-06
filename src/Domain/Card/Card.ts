import CardId from './CardId';
import CardQuestion from './CardQuestion';
import CardContent from './Content/CardContent';
import CardTemplateType from './CardTemplateType';
import CardStatistics from './CardStatistics';
import Deck from '../Deck/Deck';
import DomainNotExistsError from '../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';

export default class Card {
  constructor(
    private id: CardId | undefined,
    private deck: Deck,
    private question: CardQuestion,
    private content: CardContent,
    private templateType: CardTemplateType,
    private statistics: CardStatistics,
    private nextAt: Date,
    private seenAt: Date,
    private updatedAt: Date,
    private createdAt: Date,
  ) {}

  public static create(
    deck: Deck,
    question: CardQuestion,
    content: CardContent,
    templateType: CardTemplateType,
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
    );
  }

  public from(
    question: CardQuestion,
    content: CardContent,
    templateType: CardTemplateType,
  ): void {
    this.question = question;
    this.content = content;
    this.templateType = templateType;
  }

  public isExists(): boolean {
    return undefined !== this.id;
  }

  public setId(id: CardId): void {
    if (this.isExists()) {
      throw new Error('ID is already exists');
    }

    this.id = id;
  }

  public getId(): CardId {
    if (undefined === this.id) {
      throw new DomainNotExistsError();
    }

    return this.id;
  }

  public getDeck(): Deck {
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

  public updateLastView(): void {
    this.nextAt = new Date();

    this.statistics.increaseViews();
  }
}
