import Tag from '../../model/Tag';
import { TagRaw, unserializeTag } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';

export const findTagByDeckIdAndNameRequest = async (
  deckId: number,
  name: string,
): Promise<Tag | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS)
    .index('deck_id_and_name_idx')
    .get(IDBKeyRange.only([deckId, name]));

  return requestPromise<TagRaw>(request).then((raw) =>
    undefined !== raw ? unserializeTag(raw) : undefined,
  );
};
