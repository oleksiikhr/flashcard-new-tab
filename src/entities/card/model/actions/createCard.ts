import { cardVocabularyContent } from '../content/cardVocabularyContent';
import { Card, CardTemplateType, createCardModel } from '../card';
import {createCardQuery} from "../../database/repository/command";

export const createVocabularyCard = async (
  question: string,
  answer: string,
  isActive: boolean,
): Promise<Card> => {
  const card = createCardModel(
    question,
    cardVocabularyContent({ answer }),
    CardTemplateType.VOCABULARY,
    isActive,
  );

  await createCardQuery(card);

  return card;
};
