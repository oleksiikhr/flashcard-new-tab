import CardTemplateType from '../ValueObject/CardTemplateType';
import CardVocabularyContent from './CardVocabularyContent';
import CardContent from './CardContent';
import ContentNotSupportedByTemplateTypeError from './ContentNotSupportedByTemplateTypeError';

export default class CardContentFactory {
  public make(data: object, templateType: CardTemplateType): CardContent {
    if (templateType.isVocabulary()) {
      return new CardVocabularyContent(data);
    }

    throw new ContentNotSupportedByTemplateTypeError(templateType);
  }
}
