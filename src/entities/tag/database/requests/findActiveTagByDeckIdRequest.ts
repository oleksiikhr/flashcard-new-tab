import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Tag, TagSerialized, unserializeTag } from '../../model/tag';

export const findActiveTagByDeckIdRequest = async (
  deckId: number,
): Promise<Tag[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS)
    .index('deck_id_and_is_active_idx')
    .getAll([deckId, 1]);

  return requestPromise<TagSerialized[]>(request).then((raws) =>
    (raws as TagSerialized[]).map((raw) => unserializeTag(raw)),
  );
};
