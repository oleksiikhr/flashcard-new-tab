import Card from '../../model/Card';
import { randomUniqueRange } from '../../../../shared/util/algorithm';
import { CardRaw, unserializeCard } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import {
  requestCursor,
  requestPromise,
} from '../../../../shared/database/indexedDB/idb';

export const findRandomActiveCardByDeckIdRequest = async (
  deckId: number,
  count: number,
): Promise<Card[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .index('deck_id_and_is_active_idx');

  const query = IDBKeyRange.only([deckId, 1]);
  const total = (await requestPromise<number>(request.count(query))) as number;

  const numbers = randomUniqueRange(total, count, 1);
  const cards: Card[] = [];
  let init = true;

  await requestCursor(request.openCursor(query), (cursor) => {
    const card = unserializeCard(cursor.value as CardRaw);

    if (init && 1 !== numbers[0]) {
      init = false;

      // @ts-ignore
      return cursor.advance(numbers[0] - 1);
    }

    if (cards.push(card) === numbers.length) {
      return false;
    }

    // @ts-ignore
    return cursor.advance(numbers[cards.length] - numbers[cards.length - 1]);
  });

  return cards;
};
