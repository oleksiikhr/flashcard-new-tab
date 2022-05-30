import SettingsPage from './SettingsPage';
import Page from './Page';
import { createDeck, createTag, findActiveCard } from '../bootstrap/bus';
import { log, error } from '../../Domain/Shared/Util/logger';
import { displayCard } from '../components/card';
import pageManager from './PageManager';

export default class HomePage implements Page {
  protected rootElement!: HTMLDivElement;

  protected cardElement!: HTMLDivElement;

  onFirstMount() {
    this.rootElement = document.querySelector(
      `[page="home"]`
    ) as HTMLDivElement;

    this.cardElement = document.querySelector(
      `[component="card"]`
    ) as HTMLDivElement;

    this.rootElement.querySelector('#btn-1')?.addEventListener('click', () => {
      pageManager.setPage(SettingsPage);
    });

    this.rootElement
      .querySelector('#deck-form-create')
      ?.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const name = this.rootElement.querySelector(
          '#deck-name'
        ) as HTMLInputElement;
        const isActive = this.rootElement.querySelector(
          '#deck-is_active'
        ) as HTMLInputElement;

        createDeck(name.value, isActive.checked, {}).then(log).catch(error);
      });

    this.rootElement
      .querySelector('#tag-form-create')
      ?.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const name = this.rootElement.querySelector(
          '#tag-name'
        ) as HTMLInputElement;
        const deckId = this.rootElement.querySelector(
          '#tag-deck_id'
        ) as HTMLInputElement;
        const isActive = this.rootElement.querySelector(
          '#tag-is_active'
        ) as HTMLInputElement;

        createTag(+deckId.value, name.value, isActive.checked)
          .then(log)
          .catch(error);
      });
  }

  mount() {
    // TODO Feed handler
    findActiveCard()
      .then((card) => {
        if (undefined !== card) {
          displayCard(this.cardElement, card);
        }
      })
      .catch(error);

    // TODO opacity/transition
    this.rootElement.style.display = '';
  }

  destroy() {
    this.rootElement.style.display = 'none';
  }
}
