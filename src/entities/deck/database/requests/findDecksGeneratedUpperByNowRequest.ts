import { DeckRaw, unserializeDeck } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import Deck from '../../model/Deck';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const findDecksGeneratedUpperByNowRequest = async (
  count: number,
): Promise<Deck[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.DECKS)
    .objectStore(StoreName.DECKS)
    .index('generate_at_idx')
    .getAll(IDBKeyRange.upperBound(new Date()), count);

  return requestPromise<DeckRaw[]>(request).then((raws) =>
    (raws as DeckRaw[]).map((raw) => unserializeDeck(raw)),
  );
};
