import Card from '../Card/Card';
import Deck from '../Deck/Deck';
import Tag from '../Tag/Tag';

export default class Feed {
  constructor(private card: Card, private deck: Deck, private tags: Tag[]) {}

  public getCard(): Card {
    return this.card;
  }

  public getDeck(): Deck {
    return this.deck;
  }

  public getTags(): Tag[] {
    return this.tags;
  }
}
