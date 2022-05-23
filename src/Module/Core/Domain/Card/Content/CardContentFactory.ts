import CardTemplateType from '../CardTemplateType';
import CardDefaultContent from './CardDefaultContent';
import CardContent from './CardContent';
import CardCreateContentError from './CardCreateContentError';

export default class CardContentFactory {
  public make(data: object, templateType: CardTemplateType): CardContent {
    if (templateType.isQuestion()) {
      return new CardDefaultContent(data);
    }

    throw new CardCreateContentError();
  }
}
