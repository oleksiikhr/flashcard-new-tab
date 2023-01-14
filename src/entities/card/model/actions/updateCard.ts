import { Card, CardStatus, updateCardModel } from '../card';
import { findCardByIdRequest } from '../../database/repository/cardQueryRepository';
import { updateCardRequest } from '../../database/repository/cardCommandRepository';
import { cardVocabularyContent } from '../content/cardVocabularyContent';

export const updateVocabularyCard = async (
  id: string,
  question: string,
  answer: string,
  status: CardStatus,
): Promise<Card> => {
  const card = await findCardByIdRequest(id);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  updateCardModel(card, {
    question,
    content: cardVocabularyContent({ answer }),
    status,
    updatedAt: new Date(),
  });

  await updateCardRequest(card);

  return card;
};
