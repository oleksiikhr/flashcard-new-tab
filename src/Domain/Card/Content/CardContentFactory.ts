import CardTemplateType from '../CardTemplateType';
import CardVocabularyContent from './CardVocabularyContent';
import CardContent from './CardContent';
import ContentNotSupportedByTemplateType from './ContentNotSupportedByTemplateType';

export default class CardContentFactory {
  public make(data: object, templateType: CardTemplateType): CardContent {
    if (templateType.isVocabulary()) {
      return new CardVocabularyContent(data);
    }

    throw new ContentNotSupportedByTemplateType();
  }
}
