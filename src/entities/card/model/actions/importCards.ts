import {
  Card,
  CardStatistics,
  CardStatus,
  CardTemplateType,
  createCardModel,
  updateCardModel,
} from '../card';
import { cardContentFactory } from '../content/cardContentFactory';
import { findCardByQuestionRequest } from '../../database/repository/cardQueryRepository';
import {
  createCardRequest,
  updateCardRequest,
} from '../../database/repository/cardCommandRepository';
import { random } from '../../../../shared/util/algorithm';

export type CardImportRaw = {
  id?: string;
  question: string;
  content: object;
  // templateType: number;
  statistics?: Partial<CardStatistics>;
  status?: CardStatus;
  seenAt?: Date | null;
  nextAt?: Date | null;
  updatedAt?: Date;
  createdAt?: Date;
};

export const importCards = async (raws: CardImportRaw[]): Promise<Card[]> => {
  const promises = raws.map(
    (
      raw, // TODO or findById
    ) =>
      findCardByQuestionRequest(raw.question).then((card) => {
        raw.status = random(0, 2);

        if (undefined === card) {
          const newCard = createCardModel(
            raw.question,
            cardContentFactory(raw.content, CardTemplateType.VOCABULARY),
            CardTemplateType.VOCABULARY,
            raw.statistics,
            raw.status,
            false,
            raw.seenAt,
            raw.status === 2 ? new Date() : null,
            raw.updatedAt,
            raw.createdAt,
          );

          return createCardRequest(newCard).then(() => newCard);
        }

        updateCardModel(card, {
          question: raw.question,
          content: cardContentFactory(raw.content, card.templateType),
          statistics: raw.statistics,
          status: raw.status,
          seenAt: raw.seenAt,
          nextAt: raw.nextAt,
          updatedAt: raw.updatedAt,
          createdAt: raw.createdAt,
        });

        return updateCardRequest(card).then(() => card);
      }),
  );

  return Promise.all(promises);
};
