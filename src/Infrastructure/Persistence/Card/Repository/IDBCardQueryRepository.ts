import Card from '../../../../Domain/Card/Card';
import CardId from '../../../../Domain/Card/CardId';
import CardQueryRepository from '../../../../Domain/Card/Repository/CardQueryRepository';
import CardMemento, { CardRaw } from '../../../../Domain/Card/CardMemento';
import IndexedDB from '../../Shared/IndexedDB/IndexedDB';
import StoreName from '../../Shared/IndexedDB/StoreName';
import { randomUniqueRange } from '../../../../Domain/Shared/Util/number';
import DeckId from '../../../../Domain/Deck/DeckId';

export default class IDBCardQueryRepository implements CardQueryRepository {
  constructor(private idb: IndexedDB, private memento: CardMemento) {}

  public async paginate(
    fromId: CardId | undefined,
    limit: number,
  ): Promise<Card[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.CARDS, 'readonly')
      .objectStore(StoreName.CARDS)
      .openCursor(
        undefined !== fromId
          ? IDBKeyRange.lowerBound(fromId.getIdentifier())
          : null,
      );

    return this.idb
      .requestPaginate<CardRaw>(request, limit)
      .then((raws) => raws.map((raw) => this.memento.unserialize(raw)));
  }

  public async findById(id: CardId): Promise<Card | undefined> {
    const db = await this.idb.openDB();

    const transaction = db.transaction(StoreName.CARDS, 'readonly');

    const request = transaction
      .objectStore(StoreName.CARDS)
      .get(id.getIdentifier());

    return this.idb
      .requestPromise<CardRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.memento.unserialize(raw) : undefined,
      );
  }

  public async findRandomActiveByDeckId(
    deckId: DeckId,
    count: number,
  ): Promise<Card[]> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.CARDS, 'readonly')
      .objectStore(StoreName.CARDS)
      .index('deck_id_and_is_active_idx');

    const query = IDBKeyRange.only([deckId.getIdentifier(), 1]);
    const total = (await this.idb.requestPromise<number>(
      request.count(query),
    )) as number;

    const numbers = randomUniqueRange(total, count, 1);
    const cards: Card[] = [];
    let init = true;

    await this.idb.requestCursor(request.openCursor(query), (cursor) => {
      const card = this.memento.unserialize(cursor.value as CardRaw);

      if (init && 1 !== numbers[0]) {
        init = false;

        return cursor.advance(numbers[0] - 1);
      }

      if (cards.push(card) === numbers.length) {
        return false;
      }

      return cursor.advance(numbers[cards.length] - numbers[cards.length - 1]);
    });

    return cards;
  }
}
