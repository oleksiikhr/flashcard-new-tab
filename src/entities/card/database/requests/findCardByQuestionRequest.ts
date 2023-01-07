import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Card, CardSerialized, unserializeCard } from '../../model/card';

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
