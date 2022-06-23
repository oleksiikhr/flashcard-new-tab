import StringValueObject from '../Shared/ValueObject/StringValueObject';
import ObjectValueValidation from '../../Infrastructure/Persistence/Shared/IndexedDB/Error/ObjectValueValidation';

export default class CardQuestion extends StringValueObject {
  /**
   * @throws {ObjectValueValidation}
   */
  constructor(value: string) {
    const name = value.trim();

    if (!name) {
      throw new ObjectValueValidation('Card question cannot be empty.');
    }

    super(name);
  }
}
