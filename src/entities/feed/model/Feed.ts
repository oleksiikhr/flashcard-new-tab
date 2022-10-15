import Card from '../../card/model/Card';
import Deck from '../../deck/model/Deck';
import Tag from '../../tag/model/Tag';

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
