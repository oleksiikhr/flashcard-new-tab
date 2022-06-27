import StringValueObject from '../Shared/ValueObject/StringValueObject';
import ObjectValueValidation from '../../Infrastructure/Persistence/Shared/IndexedDB/Error/ObjectValueValidation';

export default class TagName extends StringValueObject {
  constructor(value: string) {
    const name = value.trim();

    if (!name) {
      throw new ObjectValueValidation('Tag name cannot be empty.');
    }

    super(name);
  }
}
