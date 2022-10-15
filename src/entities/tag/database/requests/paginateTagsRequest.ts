import Tag from '../../model/Tag';
import { TagRaw, unserializeTag } from '../../model/memento';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import { StoreName } from '../../../../shared/database/indexedDB/storeName';
import { requestPaginate } from '../../../../shared/database/indexedDB/idb';

export const paginateTagsRequest = async (
  fromId: number | undefined,
  limit: number,
): Promise<Tag[]> => {
  const conn = await useConnection();

  const request = conn
    .transaction(StoreName.TAGS, 'readonly')
    .objectStore(StoreName.TAGS)
    .openCursor(undefined !== fromId ? IDBKeyRange.lowerBound(fromId) : null);

  return requestPaginate<TagRaw>(request, limit).then((raws) =>
    raws.map((raw) => unserializeTag(raw)),
  );
};
