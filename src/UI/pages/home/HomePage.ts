import Page from '../Page';
import { findRandomFeed } from '../../bootstrap/bus';
import feedStatistics from '../../components/feedStatistics/feedStatistics';
import card from '../../components/card/card';

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
      .catch((err) =>
        console.error('Error when trying to find feed', {
          error: err as Error,
        }),
      )
      .finally(() => {
        this.rootElement.style.display = '';
      });
  }

  destroy(): void {
    this.rootElement.style.display = 'none';
  }
}
