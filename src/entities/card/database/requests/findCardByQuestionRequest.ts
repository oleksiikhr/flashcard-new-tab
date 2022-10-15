import Card from '../../model/Card';
import { CardRaw, unserializeCard } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const findCardByQuestionRequest = async (
  question: string,
): Promise<Card | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .index('question_idx')
    .get(question);

  return requestPromise<CardRaw>(request).then((raw) =>
    undefined !== raw ? unserializeCard(raw) : undefined,
  );
};
