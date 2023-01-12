import {Card, CardSerialized, unserializeCard} from "../../model/card";
import {useConnection} from "../../../../shared/database/indexedDB/useConnection";
import {StoreName} from "../../../../shared/database/indexedDB/constants";
import {requestCursor, requestPaginate, requestPromise} from "../../../../shared/database/indexedDB/idb";
import {randomUniqueRange} from "../../../../shared/util/algorithm";

export const findCardByIdQuery = async (
  id: string,
): Promise<Card | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .get(id);

  return requestPromise<CardSerialized>(request).then((raw) =>
    undefined !== raw ? unserializeCard(raw) : undefined,
  );
};

export const findCardByQuestionQuery = async (
  question: string,
): Promise<Card | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .index('question_idx')
    .get(question);

  return requestPromise<CardSerialized>(request).then((raw) =>
    undefined !== raw ? unserializeCard(raw) : undefined,
  );
};

export const findNextCardQuery = async (
  count: number,
): Promise<Card[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .index('is_active_idx');

  const query = IDBKeyRange.only([1]);
  const total = (await requestPromise(request.count(query))) as number;

  const numbers = randomUniqueRange(total, count, 1);
  const cards: Card[] = [];
  let init = true;

  await requestCursor(request.openCursor(query), (cursor) => {
    const card = unserializeCard(cursor.value as CardSerialized);

    if (init && numbers[0] !== 1) {
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

export const paginateCardsQuery = async (
  fromId: string | undefined,
  limit: number,
): Promise<Card[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .openCursor(undefined !== fromId ? IDBKeyRange.lowerBound(fromId) : null);

  return requestPaginate<CardSerialized>(request, limit).then((raws) =>
    raws.map((raw) => unserializeCard(raw)),
  );
};
