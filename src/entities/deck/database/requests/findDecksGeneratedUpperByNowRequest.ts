import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Deck, DeckSerialized, unserializeDeck } from '../../model/deck';

export const findDecksGeneratedUpperByNowRequest = async (
  count: number,
): Promise<Deck[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.DECKS)
    .objectStore(StoreName.DECKS)
    .index('generate_at_idx')
    .getAll(IDBKeyRange.upperBound(new Date()), count);

  return requestPromise<DeckSerialized[]>(request).then((raws) =>
    (raws as DeckSerialized[]).map((raw) => unserializeDeck(raw)),
  );
};
