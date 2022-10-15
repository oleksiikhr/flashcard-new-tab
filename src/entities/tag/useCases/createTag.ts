import Tag from '../model/Tag';
import { findDeckByIdRequest } from '../../deck/database/requests/findDeckByIdRequest';
import { createTagRequest } from '../database/requests/createTagRequest';

export const createTag = async (deckId: number, name: string): Promise<Tag> => {
  const deck = await findDeckByIdRequest(deckId);

  if (undefined === deck) {
    throw new Error('Deck not found.');
  }

  const tag = await Tag.create(deck.getId(), name);

  await createTagRequest(tag);

  return tag;
};
