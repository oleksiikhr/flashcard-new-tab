import { random } from '../../../../shared/util/algorithm';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import {
  requestPromise,
  requestRandom,
} from '../../../../shared/database/indexedDB/idb';
import {
  CardSerialized,
  CardTag,
  unserializeCard,
} from '../../../card/model/card';
import { DeckSerialized, unserializeDeck } from '../../../deck/model/deck';
import { Tag, TagSerialized, unserializeTag } from '../../../tag/model/tag';
import { Feed, FeedSerialized } from '../../model/feed';

export const findRandomFeedRequest = async (): Promise<Feed | undefined> => {
  const conn = await useConnection();

  const transaction = conn.transaction(
    [
      StoreName.DECKS,
      StoreName.FEED,
      StoreName.CARDS,
      StoreName.CARD_TAG,
      StoreName.TAGS,
    ],
    'readonly',
  );

  const feedStore = transaction.objectStore(StoreName.FEED);
  const cardStore = transaction.objectStore(StoreName.CARDS);
  const tagStore = transaction.objectStore(StoreName.TAGS);
  const deckStore = transaction.objectStore(StoreName.DECKS);
  const cardTagStore = transaction
    .objectStore(StoreName.CARD_TAG)
    .index('card_id_idx');

  const feedTotal = (await requestPromise(feedStore.count())) as number;

  if (feedTotal === 0) {
    return undefined;
  }

  const position = random(0, feedTotal - 1);
  const feed = await requestRandom<FeedSerialized>(
    feedStore.openCursor(),
    position,
  );

  if (undefined === feed) {
    return undefined;
  }

  const [card, deck, tags] = await Promise.all([
    requestPromise<CardSerialized>(cardStore.get(feed.card_id)).then((raw) =>
      undefined !== raw ? unserializeCard(raw) : undefined,
    ),
    requestPromise<DeckSerialized>(deckStore.get(feed.deck_id)).then((raw) =>
      undefined !== raw ? unserializeDeck(raw) : undefined,
    ),
    requestPromise<CardTag[]>(cardTagStore.getAll(feed.card_id)).then((raws) =>
      Promise.all(
        (raws as CardTag[]).map((raw) =>
          requestPromise<TagSerialized>(tagStore.get(raw.tag_id)).then(
            (subRaw) =>
              undefined !== subRaw ? unserializeTag(subRaw) : undefined,
          ),
        ),
      ),
    ),
  ]);

  if (undefined === card) {
    throw new Error('Card not found.');
  }

  if (undefined === deck) {
    throw new Error('Deck not found.');
  }

  return {
    card,
    deck,
    tags: tags.filter((tag) => undefined !== tag) as Tag[],
    count: feedTotal,
    position: position + 1,
  };
};
