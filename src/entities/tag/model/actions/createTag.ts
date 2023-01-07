import { findDeckByIdRequest } from '../../../deck/database/requests/findDeckByIdRequest';
import { createTagRequest } from '../../database/requests/createTagRequest';
import { createTagModel, Tag } from '../tag';
import { findTagByDeckIdAndNameRequest } from '../../database/requests/findTagByDeckIdAndNameRequest';

export const createTag = async (deckId: string, name: string): Promise<Tag> => {
  const deck = await findDeckByIdRequest(deckId);

  if (undefined === deck) {
    throw new Error('Deck not found.');
  }

  if ((await findTagByDeckIdAndNameRequest(deckId, name)) !== null) {
    throw new Error('Tag name with this deck must be unique.');
  }

  const tag = createTagModel(deck.id, name);

  await createTagRequest(tag);

  return tag;
};
