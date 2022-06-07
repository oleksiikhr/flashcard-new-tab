import SettingsPage from './SettingsPage';
import Page from './Page';
import { createTag, findRandomFeed } from '../bootstrap/bus';
import { log, error } from '../../Domain/Shared/Util/logger';
import pageManager from './PageManager';
import { cardTestHandle } from '../components/card';
import { deckTestHandle } from '../components/deck';
import { feedTestHandle } from '../components/feed';

export default class HomePage implements Page {
  protected rootElement!: HTMLDivElement;

  protected cardElement!: HTMLDivElement;

  onFirstMount() {
    this.rootElement = document.querySelector(
      `[page="home"]`,
    ) as HTMLDivElement;

    this.cardElement = document.querySelector(
      `[component="card"]`,
    ) as HTMLDivElement;

    this.rootElement.querySelector('#btn-1')?.addEventListener('click', () => {
      pageManager.setPage(SettingsPage);
    });

    deckTestHandle(this.rootElement);
    cardTestHandle(this.rootElement);
    feedTestHandle(this.rootElement);

    this.rootElement
      .querySelector('#tag-form-create')
      ?.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const name = this.rootElement.querySelector(
          '#tag-name',
        ) as HTMLInputElement;
        const deckId = this.rootElement.querySelector(
          '#tag-deck_id',
        ) as HTMLInputElement;
        const isActive = this.rootElement.querySelector(
          '#tag-is_active',
        ) as HTMLInputElement;

        createTag(+deckId.value, name.value, isActive.checked)
          .then(log)
          .catch(error);
      });
  }

  mount() {
    const consoleElement = document.querySelector('#console') as HTMLElement;

    findRandomFeed()
      .then((card) => {
        log('findFeed', card);
        consoleElement.innerHTML = JSON.stringify(card, null, '\t');
      })
      .catch(error);

    // TODO opacity/transition
    this.rootElement.style.display = '';
  }

  destroy() {
    this.rootElement.style.display = 'none';
  }
}
