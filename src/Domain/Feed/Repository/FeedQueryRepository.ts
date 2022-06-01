import CardId from '../../Card/CardId';

export default interface FeedQueryRepository {
  findRandom(): Promise<CardId | undefined>;
}
