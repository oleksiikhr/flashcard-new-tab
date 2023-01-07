import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { Tag, TagSerialized, unserializeTag } from '../../model/tag';

export const findTagByIdRequest = async (
  id: number,
): Promise<Tag | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS)
    .get(id);

  return requestPromise<TagSerialized>(request).then((raw) =>
    undefined !== raw ? unserializeTag(raw) : undefined,
  );
};
