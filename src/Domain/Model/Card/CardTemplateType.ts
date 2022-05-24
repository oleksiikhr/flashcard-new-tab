import NumberValueObject from '../../ValueObject/NumberValueObject';

export default class CardTemplateType extends NumberValueObject {
  public static QUESTION = 0;

  public isQuestion(): boolean {
    return CardTemplateType.QUESTION === this.getValue();
  }
}
