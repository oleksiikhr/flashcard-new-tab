import Card from '../Card';
import CardId from '../CardId';
import DeckId from '../../Deck/DeckId';

export default interface CardQueryRepository {
  paginate(fromId: CardId | undefined, limit: number): Promise<Card[]>;

  findById(id: CardId): Promise<Card | undefined>;

  findRandomActiveByDeckId(deckId: DeckId, count: number): Promise<Card[]>;
}
