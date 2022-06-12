import CardId from './CardId';
import CardQuestion from './CardQuestion';
import CardContent from './Content/CardContent';
import CardTemplateType from './CardTemplateType';
import CardStatistics from './CardStatistics';
import DomainNotExistsError from '../../Infrastructure/Persistence/Shared/IndexedDB/Error/DomainNotExistsError';
import DeckId from '../Deck/DeckId';

export default class Card {
  constructor(
    private id: CardId | undefined,
    private deckId: DeckId,
    private question: CardQuestion,
    private content: CardContent,
    private templateType: CardTemplateType,
    private statistics: CardStatistics,
    private isActive: boolean,
    private seenAt: Date,
    private updatedAt: Date,
    private createdAt: Date,
  ) {}

  public static create(
    deckId: DeckId,
    question: CardQuestion,
    content: CardContent,
    templateType: CardTemplateType,
  ): Card {
    return new Card(
      undefined,
      deckId,
      question,
      content,
      templateType,
      CardStatistics.create(),
      true,
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
    this.updatedAt = new Date();
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

  public getDeckId(): DeckId {
    return this.deckId;
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

  public getIsActive(): boolean {
    return this.isActive;
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

  public updateLastSeen() {
    this.statistics.increaseViews();

    this.seenAt = new Date();
  }
}
