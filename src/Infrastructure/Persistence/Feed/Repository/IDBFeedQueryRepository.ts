import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import FeedQueryRepository from '../../../../Domain/Feed/Repository/FeedQueryRepository';
import CardMemento, {
  CardRaw,
  CardTagRaw,
} from '../../../../Domain/Card/CardMemento';
import StoreName from '../../Shared/IndexedDB/StoreName';
import { requestPromise, requestRandom } from '../../Shared/IndexedDB/Util/idb';
import Feed from '../../../../Domain/Feed/Feed';
import { FeedRaw } from '../../../../Domain/Feed/FeedMemento';
import DeckMemento, { DeckRaw } from '../../../../Domain/Deck/DeckMemento';
import TagMemento, { TagRaw } from '../../../../Domain/Tag/TagMemento';
import Tag from '../../../../Domain/Tag/Tag';
import DomainNotFoundError from '../../Shared/IndexedDB/Error/DomainNotFoundError';
import { random } from '../../../../Domain/Shared/Util/number';

export default class IDBFeedQueryRepository implements FeedQueryRepository {
  constructor(
    private deckMemento: DeckMemento,
    private cardMemento: CardMemento,
    private tagMemento: TagMemento,
    private idb: IndexedDB,
  ) {}

  public async findRandom(): Promise<Feed | undefined> {
    const db = await this.idb.openDB();

    const transaction = db.transaction(
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

    // TODO Cache result
    const feedTotal = (await requestPromise<number>(
      feedStore.count(),
    )) as number;

    if (0 === feedTotal) {
      return undefined;
    }

    const position = random(0, feedTotal - 1);
    const feed = await requestRandom<FeedRaw>(feedStore.openCursor(), position);

    if (undefined === feed) {
      return undefined;
    }

    const [card, deck, tags] = await Promise.all([
      requestPromise<CardRaw>(cardStore.get(feed.card_id)).then((raw) =>
        undefined !== raw ? this.cardMemento.unserialize(raw) : undefined,
      ),
      requestPromise<DeckRaw>(deckStore.get(feed.deck_id)).then((raw) =>
        undefined !== raw ? this.deckMemento.unserialize(raw) : undefined,
      ),
      requestPromise<CardTagRaw[]>(cardTagStore.getAll(feed.card_id)).then(
        (raws) =>
          Promise.all(
            (raws as CardTagRaw[]).map((raw) =>
              requestPromise<TagRaw>(tagStore.get(raw.tag_id)).then((subRaw) =>
                undefined !== subRaw
                  ? this.tagMemento.unserialize(subRaw)
                  : undefined,
              ),
            ),
          ),
      ),
    ]);

    if (undefined === card || undefined === deck) {
      throw new DomainNotFoundError();
    }

    return new Feed(
      card,
      deck,
      tags.filter((tag) => undefined !== tag) as Tag[],
      feedTotal,
      position,
    );
  }
}
