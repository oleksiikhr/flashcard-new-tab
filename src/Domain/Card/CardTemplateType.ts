import NumberValueObject from '../Shared/ValueObject/NumberValueObject';

export default class CardTemplateType extends NumberValueObject {
  public static VOCABULARY = 0;

  public static createVocabulary() {
    return new CardTemplateType(CardTemplateType.VOCABULARY);
  }

  public isVocabulary(): boolean {
    return CardTemplateType.VOCABULARY === this.getValue();
  }
}
