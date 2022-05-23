import { CardTemplateType } from '../CardTemplateType';
import CardDefaultContent from './CardDefaultContent';
import CardContent from './CardContent';

export default class CardContentFactory {
  public make(data: object, templateType: CardTemplateType): CardContent {
    if (CardTemplateType.QUESTION === templateType) {
      return new CardDefaultContent(data);
    }

    // TODO
    return new CardDefaultContent(data);
  }
}
