import { deleteTagRequest } from '../../database/requests/deleteTagRequest';
import { findTagByIdRequest } from '../../database/requests/findTagByIdRequest';
import { Tag } from '../tag';

export const deleteTag = async (id: number): Promise<Tag | undefined> => {
  const tag = await findTagByIdRequest(id);

  if (undefined === tag) {
    return Promise.resolve(undefined);
  }

  await deleteTagRequest(tag);

  return tag;
};
