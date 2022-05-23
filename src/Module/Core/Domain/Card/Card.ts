import CardId from './CardId';
import CardQuestion from './CardQuestion';
import CardContent from './Content/CardContent';
import CardTemplateType from './CardTemplateType';
import CardStatistics, { CardStatisticsRaw } from './CardStatistics';
import CardContentFactory from './Content/CardContentFactory';

export type CardRaw = {
  id: number | undefined;
  question: string;
  content: object;
  template_type: number;
  statistics: CardStatisticsRaw;
  next_at: Date | null;
  updated_at: Date;
  created_at: Date;
};

export default class Card {
  constructor(
    private id: CardId | undefined,
    private question: CardQuestion,
    private content: CardContent,
    private templateType: CardTemplateType,
    private statistics: CardStatistics,
    private nextAt: Date | null,
    private updatedAt: Date,
    private createdAt: Date
  ) {}

  public serialize(): CardRaw {
    return {
      id: this.id?.getIdentifier(),
      question: this.question.getValue(),
      content: this.content.serialize(),
      template_type: this.templateType.getValue(),
      statistics: this.statistics.serialize(),
      next_at: this.nextAt,
      updated_at: this.updatedAt,
      created_at: this.createdAt,
    };
  }

  public clone(): Card {
    return new Card(
      undefined,
      this.question,
      this.content,
      this.templateType,
      this.statistics,
      this.nextAt,
      this.updatedAt,
      this.createdAt
    );
  }

  public getId(): CardId | undefined {
    return this.id;
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

  public getNextAt(): Date | null {
    return this.nextAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }
}

export function unserialize(raw: CardRaw, factory: CardContentFactory) {
  const templateType = new CardTemplateType(raw.template_type);

  return new Card(
    undefined !== raw.id ? CardId.of(raw.id) : undefined,
    new CardQuestion(raw.question),
    factory.make(raw.content, templateType),
    templateType,
    new CardStatistics(raw.statistics),
    raw.next_at,
    raw.updated_at,
    raw.created_at
  );
}
