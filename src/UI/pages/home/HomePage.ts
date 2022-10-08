import Page from '../Page';
import feedStatistics from '../../components/feedStatistics/feedStatistics';
import card from '../../components/card/card';
import { findRandomFeed } from '../../../Application/Feed/FindRandomFeed';
import { version } from '../../../../package.json';

export default class HomePage implements Page {
  protected rootElement!: HTMLDivElement;

  onFirstMount(): void {
    this.rootElement = document.querySelector(
      '[page="home"]',
    ) as HTMLDivElement;

    (
      this.rootElement.querySelector('.package-version') as HTMLDivElement
    ).innerText = `Version ${version}`;
  }

  mount(): void {
    findRandomFeed
      .invoke()
      .then((feed) => {
        if (undefined !== feed) {
          feedStatistics(feed.getPosition(), feed.getCount());
          card(feed.getCard(), feed.getDeck(), feed.getTags());
        }
      })
      .catch((err: unknown) => console.error(err))
      .finally(() => {
        this.rootElement.style.display = '';
      });
  }

  destroy(): void {
    this.rootElement.style.display = 'none';
  }
}
