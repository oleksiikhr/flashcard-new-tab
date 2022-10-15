import Card from '../../model/Card';
import { CardRaw, unserializeCard } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { requestPaginate } from '../../../../shared/database/indexedDB/idb';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';

export const paginateCardsRequest = async (
  fromId: number | undefined,
  limit: number,
): Promise<Card[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.CARDS, 'readonly')
    .objectStore(StoreName.CARDS)
    .openCursor(undefined !== fromId ? IDBKeyRange.lowerBound(fromId) : null);

  return requestPaginate<CardRaw>(request, limit).then((raws) =>
    raws.map((raw) => unserializeCard(raw)),
  );
};
