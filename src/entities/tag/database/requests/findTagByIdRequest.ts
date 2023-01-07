import Tag from '../../model/Tag';
import { TagRaw, unserializeTag } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { requestPromise } from '../../../../shared/database/indexedDB/idb';
import { StoreName } from '../../../../shared/database/indexedDB/constants';

export const findTagByIdRequest = async (
  id: number,
): Promise<Tag | undefined> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS)
    .get(id);

  return requestPromise<TagRaw>(request).then((raw) =>
    undefined !== raw ? unserializeTag(raw) : undefined,
  );
};
