import NumberValueObject from '../Shared/ValueObject/NumberValueObject';

export default class CardTemplateType extends NumberValueObject {
  public static QUESTION = 0;

  public isQuestion(): boolean {
    return CardTemplateType.QUESTION === this.getValue();
  }
}
