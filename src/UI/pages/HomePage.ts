import Page from './Page';
import { findRandomFeed } from '../bootstrap/bus';
import { log, error } from '../../Domain/Shared/Util/logger';
import { feedTestHandle } from '../components/feed';

export default class HomePage implements Page {
  protected rootElement!: HTMLDivElement;

  onFirstMount() {
    this.rootElement = document.querySelector(
      `[page="home"]`,
    ) as HTMLDivElement;

    feedTestHandle(this.rootElement);
  }

  mount() {
    findRandomFeed()
      .then((feed) => {
        log('findRandomFeed', feed);
      })
      .catch(error);

    // TODO opacity/transition
    this.rootElement.style.display = '';
  }

  destroy() {
    this.rootElement.style.display = 'none';
  }
}
