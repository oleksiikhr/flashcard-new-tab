import Card from '../Card';

export interface CardQueryRepository {
  findById(id: number): Card;
}
