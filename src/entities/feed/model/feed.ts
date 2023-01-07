import { Deck } from '../../deck/model/deck';
import { Card } from '../../card/model/card';
import { Tag } from '../../tag/model/tag';

export type Feed = {
  card: Card;
  deck: Deck;
  tags: Tag[];
  count: number;
  position: number;
};

export type FeedSerialized = {
  card_id: string;
  deck_id: string;
};
