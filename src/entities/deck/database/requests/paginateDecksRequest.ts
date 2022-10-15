import Deck from '../../model/Deck';
import { DeckRaw, unserializeDeck } from '../../model/memento';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { requestPaginate } from '../../../../shared/database/indexedDB/idb';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';

export const paginateDecksRequest = async (
  fromId: number | undefined,
  limit: number,
): Promise<Deck[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.DECKS)
    .objectStore(StoreName.DECKS)
    .openCursor(undefined !== fromId ? IDBKeyRange.lowerBound(fromId) : null);

  return requestPaginate<DeckRaw>(request, limit).then((raws) =>
    raws.map((raw) => unserializeDeck(raw)),
  );
};
