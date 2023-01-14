import {
  Card,
  CardSerialized,
  CardStatus,
  unserializeCard,
} from '../../model/card';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import {
  requestPaginate,
  requestPromise,
  requestRandomValues,
} from '../../../../shared/database/indexedDB/idb';

// TODO to null

export const findCardByIdRequest = async (
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

export const findCardByQuestionRequest = async (
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

export const findRandomFeedCardRequest = async (): Promise<Card | null> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .index('is_feed_idx');

  const cards = await requestRandomValues(
    request,
    IDBKeyRange.only(1),
    1,
    (value) => unserializeCard(value as CardSerialized),
  );

  return cards[0] ?? null;
};

export const findRandomNewCardsRequest = async (
  limit: number,
): Promise<Card[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .index('status_idx');

  return requestRandomValues(
    request,
    IDBKeyRange.only(CardStatus.NEW),
    limit,
    (value) => unserializeCard(value as CardSerialized),
  );
};

export const findRandomNextAtUpperBoundCardsRequest = async (
  limit: number,
  upperDate: Date,
): Promise<Card[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .index('next_at_idx');

  return requestRandomValues(
    request,
    IDBKeyRange.upperBound(upperDate),
    limit,
    (value) => unserializeCard(value as CardSerialized),
  );
};

export const findRandomNextAtLowerBoundCardsRequest = async (
  limit: number,
  lowerDate: Date,
): Promise<Card[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .index('next_at_idx');

  return requestRandomValues(
    request,
    IDBKeyRange.lowerBound(lowerDate),
    limit,
    (value) => unserializeCard(value as CardSerialized),
  );
};

export const paginateCardsRequest = async (
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
