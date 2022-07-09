import ValueObject from '../Shared/ValueObject/ValueObject';
import ObjectValueValidation from '../../Infrastructure/Persistence/Shared/IndexedDB/Error/ObjectValueValidation';

export default class CardQuestion extends ValueObject<string> {
  constructor(value: string) {
    const name = value.trim();

    if (!name) {
      throw new ObjectValueValidation('Card question cannot be empty.');
    }

    super(name);
  }
}
