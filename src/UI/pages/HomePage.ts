import SettingsPage from './SettingsPage';
import Page from './Page';
import {
  createCard,
  createDeck,
  createTag,
  findRandomFeed,
} from '../bootstrap/bus';
import { log, error } from '../../Domain/Shared/Util/logger';
import pageManager from './PageManager';
import { cardTestHandle } from '../components/card';
import { deckTestHandle } from '../components/deck';
import { feedTestHandle } from '../components/feed';
import { random } from '../../Domain/Shared/Util/number';
import { tagTestHandle } from '../components/tag';

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
    tagTestHandle(this.rootElement);

    /* eslint-disable @typescript-eslint/no-misused-promises */
    this.rootElement
      ?.querySelector('#generate-data')
      ?.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        let promises = [];

        for (let i = 1; 100 >= i; i += 1) {
          promises.push(createDeck(`Deck: ${i}`, !!random(0, 1), {}));
        }

        await Promise.all(promises);
        promises = [];
        log('Decks created');

        for (let i = 1; 1000 >= i; i += 1) {
          promises.push(
            createCard(
              random(1, 100),
              `Question: ${i}`,
              { answer: `Answer: ${i}` },
              0,
            ),
          );
        }

        await Promise.all(promises);
        promises = [];
        log('Cards created');

        for (let i = 1; 300 >= i; i += 1) {
          promises.push(createTag(random(1, 100), `Tag: ${i}`));
        }

        await Promise.all(promises);
        promises = [];
        log('Tags created');
      });
  }

  mount() {
    const consoleElement = document.querySelector('#console') as HTMLElement;

    findRandomFeed()
      .then((card) => {
        consoleElement.innerHTML =
          card?.getId().getIdentifier().toString() || 'not found';
      })
      .catch(error);

    // TODO opacity/transition
    this.rootElement.style.display = '';
  }

  destroy() {
    this.rootElement.style.display = 'none';
  }
}
