import Tag from '../../model/Tag';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { TagRaw, unserializeTag } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';

export const findTagsByIdRequest = async (ids: number[]): Promise<Tag[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS);

  const promises = ids.map((id) =>
    requestPromise<TagRaw>(request.get(id)).then((raw) =>
      undefined !== raw ? unserializeTag(raw) : undefined,
    ),
  );

  const tags = await Promise.all<Tag | undefined>(promises);

  return tags.filter((tag) => undefined !== tag) as Tag[];
};
