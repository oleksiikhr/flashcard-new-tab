import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { requestPaginate } from '../../../../shared/database/indexedDB/idb';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { Card, CardSerialized, unserializeCard } from '../../model/card';

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
