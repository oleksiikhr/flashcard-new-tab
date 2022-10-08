import Card from '../../../../Domain/Modules/Card/Card';
import IndexedDB from '../../../Persistence/IndexedDB/IndexedDB';
import CardMemento, {
  CardRaw,
} from '../../../../Domain/Modules/Card/Service/CardMemento';
import CardId from '../../../../Domain/Modules/Card/CardId';
import StoreName from '../../../Persistence/IndexedDB/StoreName';
import DeckId from '../../../../Domain/Modules/Deck/DeckId';
import { randomUniqueRange } from '../../../../Domain/Util/algorithm';
import CardQueryRepository from '../../../../Domain/Modules/Card/Repository/CardQueryRepository';

export default class IDBCardQueryRepository implements CardQueryRepository {
  constructor(private cardMemento: CardMemento, private idb: IndexedDB) {}

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
      .then((raws) => raws.map((raw) => this.cardMemento.unserialize(raw)));
  }

  public async findById(id: CardId): Promise<Card | undefined> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.CARDS, 'readonly')
      .objectStore(StoreName.CARDS)
      .get(id.getIdentifier());

    return this.idb
      .requestPromise<CardRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.cardMemento.unserialize(raw) : undefined,
      );
  }

  public async findByQuestion(question: string): Promise<Card | undefined> {
    const db = await this.idb.openDB();

    const request = db
      .transaction(StoreName.CARDS, 'readonly')
      .objectStore(StoreName.CARDS)
      .index('question_idx')
      .get(question);

    return this.idb
      .requestPromise<CardRaw>(request)
      .then((raw) =>
        undefined !== raw ? this.cardMemento.unserialize(raw) : undefined,
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
      const card = this.cardMemento.unserialize(cursor.value as CardRaw);

      if (init && 1 !== numbers[0]) {
        init = false;

        // @ts-ignore
        return cursor.advance(numbers[0] - 1);
      }

      if (cards.push(card) === numbers.length) {
        return false;
      }

      // @ts-ignore
      return cursor.advance(numbers[cards.length] - numbers[cards.length - 1]);
    });

    return cards;
  }
}