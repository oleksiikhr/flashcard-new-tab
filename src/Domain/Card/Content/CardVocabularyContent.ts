import CardContent from './CardContent';
import ObjectValueValidation from '../../../Infrastructure/Persistence/Shared/IndexedDB/Error/ObjectValueValidation';

export default class CardVocabularyContent implements CardContent {
  private readonly answer: string;

  constructor(content: { answer?: string }) {
    this.answer = (content.answer || '').trim();

    if (!this.answer) {
      throw new ObjectValueValidation(
        'Card vocabulary answer cannot be empty.',
      );
    }
  }

  public static create(answer: string) {
    return new CardVocabularyContent({
      answer,
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
