import { cardVocabularyContent } from '../content/cardVocabularyContent';
import { Card, CardStatus, CardTemplateType, createCardModel } from '../card';
import { createCardRequest } from '../../database/repository/cardCommandRepository';

export const createVocabularyCard = async (
  question: string,
  answer: string,
  status: CardStatus,
): Promise<Card> => {
  const card = createCardModel(
    question,
    cardVocabularyContent({ answer }),
    CardTemplateType.VOCABULARY,
    {},
    status,
  );

  await createCardRequest(card);

  return card;
};
