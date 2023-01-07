import { Deck, DeckSerialized, unserializeDeck } from '../../model/deck';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const findDeckByIdRequest = async (
  id: string,
): Promise<Deck | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.DECKS)
    .objectStore(StoreName.DECKS)
    .get(id);

  return requestPromise<DeckSerialized>(request).then((raw) =>
    undefined !== raw ? unserializeDeck(raw) : undefined,
  );
};
