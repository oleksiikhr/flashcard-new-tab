import Card from '../model/Card';
import Tag from '../../tag/model/Tag';
import { findCardByIdRequest } from '../database/requests/findCardByIdRequest';
import { syncCardTagsRequest } from '../database/requests/syncCardTagsRequest';
import { findTagsByIdRequest } from '../../tag/database/requests/findTagsByIdRequest';

export const syncCardTags = async (
  cardId: number,
  tagIds: number[],
): Promise<{ card: Card; tags: Tag[] }> => {
  const card = await findCardByIdRequest(cardId);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  const tags = await findTagsByIdRequest(tagIds);

  await syncCardTagsRequest(card, tags);

  return { card, tags };
};
