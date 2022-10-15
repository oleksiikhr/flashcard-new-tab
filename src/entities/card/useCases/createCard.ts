import Card, { CardTemplateType } from '../model/Card';
import { findDeckByIdRequest } from '../../deck/database/requests/findDeckByIdRequest';
import { cardVocabularyContent } from '../model/content/cardVocabularyContent';
import { createCardRequest } from '../database/requests/createCardRequest';

export const createVocabularyCard = async (
  deckId: number,
  question: string,
  answer: string,
  isActive: boolean,
): Promise<Card> => {
  const deck = await findDeckByIdRequest(deckId);

  if (undefined === deck) {
    throw new Error('Deck not found.');
  }

  const card = Card.create(
    deck.getId(),
    question,
    cardVocabularyContent({ answer }),
    CardTemplateType.VOCABULARY,
    isActive,
  );

  await createCardRequest(card);

  return card;
};
