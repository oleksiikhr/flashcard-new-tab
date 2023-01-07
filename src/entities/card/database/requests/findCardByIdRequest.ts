import Card from '../../model/Card';
import { CardRaw, unserializeCard } from '../../model/memento';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const findCardByIdRequest = async (
  id: number,
): Promise<Card | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .get(id);

  return requestPromise<CardRaw>(request).then((raw) =>
    undefined !== raw ? unserializeCard(raw) : undefined,
  );
};
