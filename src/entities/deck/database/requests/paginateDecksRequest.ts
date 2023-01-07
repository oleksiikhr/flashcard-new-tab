import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPaginate } from '../../../../shared/database/indexedDB/idb';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { Deck, DeckSerialized, unserializeDeck } from '../../model/deck';

export const paginateDecksRequest = async (
  fromId: number | undefined,
  limit: number,
): Promise<Deck[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.DECKS)
    .objectStore(StoreName.DECKS)
    .openCursor(undefined !== fromId ? IDBKeyRange.lowerBound(fromId) : null);

  return requestPaginate<DeckSerialized>(request, limit).then((raws) =>
    raws.map((raw) => unserializeDeck(raw)),
  );
};
