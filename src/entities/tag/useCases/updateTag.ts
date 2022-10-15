import Tag from '../model/Tag';
import { findTagByIdRequest } from '../database/requests/findTagByIdRequest';
import { updateTagRequest } from '../database/requests/updateTagRequest';

export const updateTag = async (id: number, name: string): Promise<Tag> => {
  const tag = await findTagByIdRequest(id);

  if (undefined === tag) {
    throw new Error('Tag not found.');
  }

  await tag.update(name);

  await updateTagRequest(tag);

  return tag;
};
