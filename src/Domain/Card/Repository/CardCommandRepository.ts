import Card from '../Card';

export interface CardCommandRepository {
  create(card: Card): Promise<void>;

  update(card: Card): Promise<void>;
}
