import { cardVocabularyContent } from './cardVocabularyContent';
import { CardTemplateType } from '../card';

export interface CardContent {
  serialize(): object;
}

export const cardContentFactory = (
  data: object,
  templateType: CardTemplateType,
): CardContent => {
  if (templateType === CardTemplateType.VOCABULARY) {
    return cardVocabularyContent(data);
  }

  throw new Error('Content not supported by template type.');
};
