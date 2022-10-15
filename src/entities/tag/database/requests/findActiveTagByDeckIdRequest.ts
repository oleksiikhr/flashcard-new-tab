import Tag from '../../model/Tag';
import { TagRaw, unserializeTag } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const findActiveTagByDeckIdRequest = async (
  deckId: number,
): Promise<Tag[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS)
    .index('deck_id_and_is_active_idx')
    .getAll([deckId, 1]);

  return requestPromise<TagRaw[]>(request).then((raws) =>
    (raws as TagRaw[]).map((raw) => unserializeTag(raw)),
  );
};
