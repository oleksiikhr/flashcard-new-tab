import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { Tag, TagSerialized, unserializeTag } from '../../model/tag';

export const findTagsByIdRequest = async (ids: string[]): Promise<Tag[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS);

  const promises = ids.map((id) =>
    requestPromise<TagSerialized>(request.get(id)).then((raw) =>
      undefined !== raw ? unserializeTag(raw) : undefined,
    ),
  );

  const tags = await Promise.all<Tag | undefined>(promises);

  return tags.filter((tag) => undefined !== tag) as Tag[];
};
