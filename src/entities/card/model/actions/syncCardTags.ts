import { findCardByIdRequest } from '../../database/requests/findCardByIdRequest';
import { syncCardTagsRequest } from '../../database/requests/syncCardTagsRequest';
import { findTagsByIdRequest } from '../../../tag/database/requests/findTagsByIdRequest';
import { Card } from '../card';
import { Tag } from '../../../tag/model/tag';

export const syncCardTags = async (
  cardId: string,
  tagIds: string[],
): Promise<{ card: Card; tags: Tag[] }> => {
  const card = await findCardByIdRequest(cardId);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  const tags = await findTagsByIdRequest(tagIds);

  await syncCardTagsRequest(card, tags);

  return { card, tags };
};
