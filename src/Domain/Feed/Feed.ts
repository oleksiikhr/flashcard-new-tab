import Card from '../Card/Card';
import Deck from '../Deck/Deck';
import Tag from '../Tag/Tag';

export default class Feed {
  constructor(
    private card: Card,
    private deck: Deck,
    private tags: Tag[],
    private count: number,
    private position: number,
  ) {}

  public getCard(): Card {
    return this.card;
  }

  public getDeck(): Deck {
    return this.deck;
  }

  public getTags(): Tag[] {
    return this.tags;
  }

  public getCount(): number {
    return this.count;
  }

  public getPosition(): number {
    return this.position;
  }
}
