import CardTemplateType from '../CardTemplateType';
import CardVocabularyContent from './CardVocabularyContent';
import CardContent from './CardContent';
import ContentNotSupportedByTemplateTypeError from './ContentNotSupportedByTemplateTypeError';

export default class CardContentFactory {
  /**
   * @throws {ContentNotSupportedByTemplateTypeError}
   */
  public make(data: object, templateType: CardTemplateType): CardContent {
    if (templateType.isVocabulary()) {
      return new CardVocabularyContent(data);
    }

    throw new ContentNotSupportedByTemplateTypeError(templateType);
  }
}
