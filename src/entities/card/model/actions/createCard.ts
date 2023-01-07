import { findDeckByIdRequest } from '../../../deck/database/requests/findDeckByIdRequest';
import { cardVocabularyContent } from '../content/cardVocabularyContent';
import { createCardRequest } from '../../database/requests/createCardRequest';
import { Card, CardTemplateType, createCardModel } from '../card';

export const createVocabularyCard = async (
  deckId: string,
  question: string,
  answer: string,
  isActive: boolean,
): Promise<Card> => {
  const deck = await findDeckByIdRequest(deckId);

  if (undefined === deck) {
    throw new Error('Deck not found.');
  }

  const card = createCardModel(
    deck.id,
    question,
    cardVocabularyContent({ answer }),
    CardTemplateType.VOCABULARY,
    isActive,
  );

  await createCardRequest(card);

  return card;
};
