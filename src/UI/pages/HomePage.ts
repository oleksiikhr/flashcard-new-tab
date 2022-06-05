import SettingsPage from './SettingsPage';
import Page from './Page';
import {
  createCard,
  createDeck,
  createTag,
  deleteCard,
  findFeed,
} from '../bootstrap/bus';
import { log, error } from '../../Domain/Shared/Util/logger';
import pageManager from './PageManager';

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

    this.rootElement
      .querySelector('#deck-form-create')
      ?.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const name = this.rootElement.querySelector(
          '#deck-name',
        ) as HTMLInputElement;
        const isActive = this.rootElement.querySelector(
          '#deck-is_active',
        ) as HTMLInputElement;

        createDeck(name.value, isActive.checked, {}).then(log).catch(error);
      });

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

    this.rootElement
      .querySelector('#card-form-create')
      ?.addEventListener('submit', (evt) => {
        evt.preventDefault();

        const deckId = this.rootElement.querySelector(
          '#card-deck_id',
        ) as HTMLInputElement;
        const question = this.rootElement.querySelector(
          '#card-question',
        ) as HTMLInputElement;
        const answer = this.rootElement.querySelector(
          '#card-answer',
        ) as HTMLInputElement;

        createCard(
          +deckId.value,
          question.value,
          { answer: answer.value },
          0,
          [1, 2],
        )
          .then(log)
          .catch(error);
      });

    this.rootElement
      .querySelector('#feed-generate')
      ?.addEventListener('click', (evt) => {
        evt.preventDefault();

        deleteCard(1).then(log).catch(error);
        // generateFeed(10).then(console.log).catch(console.error);
      });
  }

  mount() {
    findFeed()
      .then((r) => log('findFeed', r))
      .catch(error);

    // TODO opacity/transition
    this.rootElement.style.display = '';
  }

  destroy() {
    this.rootElement.style.display = 'none';
  }
}
