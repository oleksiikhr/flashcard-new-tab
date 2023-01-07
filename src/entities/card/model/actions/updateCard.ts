import { Card, updateCardModel } from '../card';
import { findCardByIdRequest } from '../../database/requests/findCardByIdRequest';
import { cardVocabularyContent } from '../content/cardVocabularyContent';
import { updateCardRequest } from '../../database/requests/updateCardRequest';

export const updateCard = async (
  id: string,
  question: string,
  answer: string,
  isActive: boolean,
): Promise<Card> => {
  const card = await findCardByIdRequest(id);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  updateCardModel(card, {
    question,
    content: cardVocabularyContent({ answer }),
    isActive,
  });

  await updateCardRequest(card);

  return card;
};
