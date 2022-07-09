import ValueObject from '../Shared/ValueObject/ValueObject';
import ObjectValueValidation from '../../Infrastructure/Persistence/Shared/IndexedDB/Error/ObjectValueValidation';

export default class TagName extends ValueObject<string> {
  constructor(value: string) {
    const name = value.trim();

    if (!name) {
      throw new ObjectValueValidation('Tag name cannot be empty.');
    }

    super(name);
  }
}
