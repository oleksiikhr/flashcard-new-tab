import { Card, updateCardModel } from '../card';
import { cardVocabularyContent } from '../content/cardVocabularyContent';
import {findCardByIdQuery} from "../../database/repository/query";
import {updateCardQuery} from "../../database/repository/command";

export const updateCard = async (
  id: string,
  question: string,
  answer: string,
  isActive: boolean,
): Promise<Card> => {
  const card = await findCardByIdQuery(id);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  updateCardModel(card, {
    question,
    content: cardVocabularyContent({ answer }),
    isActive,
  });

  await updateCardQuery(card);

  return card;
};
