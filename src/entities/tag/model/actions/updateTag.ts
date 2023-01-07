import { findTagByIdRequest } from '../../database/requests/findTagByIdRequest';
import { updateTagRequest } from '../../database/requests/updateTagRequest';
import { Tag, updateTagModel } from '../tag';
import { findTagByDeckIdAndNameRequest } from '../../database/requests/findTagByDeckIdAndNameRequest';

export const updateTag = async (id: number, name: string): Promise<Tag> => {
  const tag = await findTagByIdRequest(id);

  if (undefined === tag) {
    throw new Error('Tag not found.');
  }

  if (
    name !== tag.name &&
    (await findTagByDeckIdAndNameRequest(tag.deckId, name)) !== null
  ) {
    throw new Error('Tag name with this deck must be unique.');
  }

  updateTagModel(tag, {
    name,
  });

  await updateTagRequest(tag);

  return tag;
};
