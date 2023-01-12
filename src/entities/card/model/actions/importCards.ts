import {
  Card,
  CardTemplateType,
  createCardModel,
  updateCardModel,
} from '../card';
import { cardContentFactory } from '../content/cardContentFactory';
import {findCardByQuestionQuery} from "../../database/repository/query";
import {createCardQuery, updateCardQuery} from "../../database/repository/command";

// TODO like CardSerialized
export type ImportRaw = {
  question: string;
  content: object;
  template_type: number;
  is_active?: boolean;
};

export const importCards = async (
  raws: ImportRaw[],
): Promise<Card[]> => {
  const promises = raws.map((raw) => {
    const { question } = raw;
    const content = cardContentFactory(
      raw.content,
      CardTemplateType.VOCABULARY,
    );

    return findCardByQuestionQuery(question)
      .then((card) => {
        if (undefined === card) {
          // TODO createCard
          const newCard = createCardModel(
            question,
            content,
            CardTemplateType.VOCABULARY,
            raw.is_active ?? true,
          );

          return createCardQuery(newCard).then(() => newCard);
        }

        updateCardModel(card, {
          question,
          content,
          isActive: raw.is_active ?? card.isActive,
        });

        return updateCardQuery(card).then(() => card);
      })
  });

  return Promise.all(promises);
};
