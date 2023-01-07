import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Card, CardSerialized, unserializeCard } from '../../model/card';

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
