import Feed from '../../model/Feed';
import { random } from '../../../../shared/util/algorithm';
import { FeedRaw } from '../../model/memento';
import {
  CardRaw,
  CardTagRaw,
  unserializeCard,
} from '../../../card/model/memento';
import { DeckRaw, unserializeDeck } from '../../../deck/model/memento';
import { TagRaw, unserializeTag } from '../../../tag/model/memento';
import Tag from '../../../tag/model/Tag';
import { StoreName } from '../../../../shared/database/indexedDB/constants';
import { useConnection } from '../../../../shared/database/indexedDB/useConnection';
import {
  requestPromise,
  requestRandom,
} from '../../../../shared/database/indexedDB/idb';

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

  const feedTotal = (await requestPromise<number>(feedStore.count())) as number;

  if (feedTotal === 0) {
    return undefined;
  }

  const position = random(0, feedTotal - 1);
  const feed = await requestRandom<FeedRaw>(feedStore.openCursor(), position);

  if (undefined === feed) {
    return undefined;
  }

  const [card, deck, tags] = await Promise.all([
    requestPromise<CardRaw>(cardStore.get(feed.card_id)).then((raw) =>
      undefined !== raw ? unserializeCard(raw) : undefined,
    ),
    requestPromise<DeckRaw>(deckStore.get(feed.deck_id)).then((raw) =>
      undefined !== raw ? unserializeDeck(raw) : undefined,
    ),
    requestPromise<CardTagRaw[]>(cardTagStore.getAll(feed.card_id)).then(
      (raws) =>
        Promise.all(
          (raws as CardTagRaw[]).map((raw) =>
            requestPromise<TagRaw>(tagStore.get(raw.tag_id)).then((subRaw) =>
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

  return new Feed(
    card,
    deck,
    tags.filter((tag) => undefined !== tag) as Tag[],
    feedTotal,
    position + 1,
  );
};
