import Card from '../Card';

export default interface CardCommandRepository {
  create(card: Card): Promise<void>;

  update(card: Card): Promise<void>;

  delete(card: Card): Promise<void>;
}
