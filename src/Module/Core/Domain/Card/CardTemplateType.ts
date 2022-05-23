import NumberValueObject from '../../../Shared/Model/ValueObject/NumberValueObject';

export default class CardTemplateType extends NumberValueObject {
  public static QUESTION = 0;

  public isQuestion(): boolean {
    return CardTemplateType.QUESTION === this.getValue();
  }
}
