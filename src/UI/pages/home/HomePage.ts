import Page from '../Page';
import feedStatistics from '../../components/feedStatistics/feedStatistics';
import card from '../../components/card/card';
import logger from '../../helper/logger';
import findRandomFeed from '../../app/bus/feed/findRandomFeed';

export default class HomePage implements Page {
  protected rootElement!: HTMLDivElement;

  onFirstMount(): void {
    this.rootElement = document.querySelector(
      '[page="home"]',
    ) as HTMLDivElement;
  }

  mount(): void {
    findRandomFeed()
      .then((feed) => {
        if (undefined !== feed) {
          feedStatistics(feed.getPosition(), feed.getCount());
          card(feed.getCard(), feed.getDeck(), feed.getTags());
        }
      })
      .catch((err: unknown) =>
        logger.error('HomePage', 'mount', 'findRandomFeed', { err }),
      )
      .finally(() => {
        this.rootElement.style.display = '';
      });
  }

  destroy(): void {
    this.rootElement.style.display = 'none';
  }
}
