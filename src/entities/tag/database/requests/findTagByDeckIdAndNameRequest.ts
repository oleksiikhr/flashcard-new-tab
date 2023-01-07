import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { Tag, TagSerialized, unserializeTag } from '../../model/tag';

export const findTagByDeckIdAndNameRequest = async (
  deckId: string,
  name: string,
): Promise<Tag | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS)
    .index('deck_id_and_name_idx')
    .get(IDBKeyRange.only([deckId, name]));

  return requestPromise<TagSerialized>(request).then((raw) =>
    undefined !== raw ? unserializeTag(raw) : undefined,
  );
};
