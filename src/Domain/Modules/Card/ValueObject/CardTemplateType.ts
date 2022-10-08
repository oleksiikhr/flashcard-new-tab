import ValueObject from '../../../ValueObject/ValueObject';

export default class CardTemplateType extends ValueObject<number> {
  public static VOCABULARY = 0;

  public static createVocabulary(): CardTemplateType {
    return new CardTemplateType(CardTemplateType.VOCABULARY);
  }

  public isVocabulary(): boolean {
    return CardTemplateType.VOCABULARY === this.getValue();
  }
}
