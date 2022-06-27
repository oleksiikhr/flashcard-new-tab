import CardContent from './CardContent';

export default class CardVocabularyContent implements CardContent {
  private readonly answer: string;

  constructor(content: { answer?: string }) {
    this.answer = content.answer || '';
  }

  public static create(answer: string) {
    return new CardVocabularyContent({
      answer: answer.trim(),
    });
  }

  public getAnswer(): string {
    return this.answer;
  }

  serialize(): object {
    return {
      answer: this.answer,
    };
  }
}
