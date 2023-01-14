import {
  importCards,
  CardImportRaw,
} from '../../entities/card/model/actions/importCards';
import { shuffle } from '../../shared/util/algorithm';
import {
  findRandomNextAtUpperBoundCardsRequest,
  findRandomNewCardsRequest,
  findRandomNextAtLowerBoundCardsRequest,
} from '../../entities/card/database/repository/cardQueryRepository';
import { updateCardModel } from '../../entities/card/model/card';
import {
  clearFeedCardsRequest,
  updateCardRequest,
} from '../../entities/card/database/repository/cardCommandRepository';

export const renderSettingsPage = () => {
  const importBulkCards = async (count?: number) => {
    let data = (await fetch(
      'https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/storage/storage/eng-ukr.json',
    ).then((response) => response.json())) as CardImportRaw[];

    if (count !== null) {
      shuffle(data);

      data = data.slice(0, count);
    }

    return importCards(data)
      .then(() => {
        console.log('Complete');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const generateFeed = async () => {
    const repeatCards = await findRandomNextAtUpperBoundCardsRequest(
      5,
      new Date(),
    );
    console.log('repeat upper', repeatCards);

    const otherCards = await findRandomNextAtLowerBoundCardsRequest(
      5,
      new Date(),
    );
    console.log('repeat lower', otherCards);

    const newCards = await findRandomNewCardsRequest(5);
    console.log('new', newCards);

    // clear feed
    clearFeedCardsRequest()
      .then(() => {
        const promises: Promise<unknown>[] = [];

        [repeatCards, otherCards, newCards].forEach((group) => {
          group.forEach((card) => {
            updateCardModel(card, { isFeed: true });
            promises.push(updateCardRequest(card));
          });
        });

        return Promise.all(promises);
      })
      .catch(console.error);
  };

  console.log(importBulkCards, generateFeed);
  // importBulkCards(100).catch(console.error);
  generateFeed().catch(console.error);

  document.body.style.display = '';
};
