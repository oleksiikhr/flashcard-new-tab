import Card from '../model/Card';
import { findCardByIdRequest } from '../database/requests/findCardByIdRequest';
import { cardVocabularyContent } from '../model/content/cardVocabularyContent';
import { updateCardRequest } from '../database/requests/updateCardRequest';

export const updateCard = async (
  id: number,
  question: string,
  answer: string,
  isActive: boolean,
): Promise<Card> => {
  const card = await findCardByIdRequest(id);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  card.update(question, cardVocabularyContent({ answer }), isActive);

  await updateCardRequest(card);

  return card;
};
