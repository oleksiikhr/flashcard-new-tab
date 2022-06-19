import Page from '../Page';
import { findRandomFeed } from '../../bootstrap/bus';
import { error } from '../../../Domain/Shared/Util/logger';
import feedStatistics from '../../components/feedStatistics/feedStatistics';
import card from '../../components/card/card';

export default class HomePage implements Page {
  protected rootElement!: HTMLDivElement;

  onFirstMount() {
    this.rootElement = document.querySelector(
      '[page="home"]',
    ) as HTMLDivElement;
  }

  mount() {
    findRandomFeed()
      .then((feed) => {
        if (undefined === feed) {
          throw new Error('Feed not found.');
        }

        feedStatistics(feed.getPosition(), feed.getCount());
        card(feed.getCard(), feed.getDeck(), feed.getTags());
      })
      .catch((e) => error(e))
      .finally(() => {
        this.rootElement.style.display = '';
      });
  }

  destroy() {
    this.rootElement.style.display = 'none';
  }
}
