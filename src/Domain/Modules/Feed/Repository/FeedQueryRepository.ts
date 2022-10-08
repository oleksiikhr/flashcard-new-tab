import Feed from '../Feed';

export default interface FeedQueryRepository {
  findRandom(): Promise<Feed | undefined>;
}
