import SettingsPage from './SettingsPage';
import Page from './Page';
import {
  createCard,
  createDeck,
  createTag,
  findRandomFeed,
  syncTagsToCard,
} from '../bootstrap/bus';
import { log, error } from '../../Domain/Shared/Util/logger';
import pageManager from './PageManager';
import { feedTestHandle } from '../components/feed';
import { random } from '../../Domain/Shared/Util/number';

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

    feedTestHandle(this.rootElement);

    /* eslint-disable @typescript-eslint/no-misused-promises */
    this.rootElement
      ?.querySelector('#generate-data')
      ?.addEventListener('submit', async (evt) => {
        evt.preventDefault();

        const decksCount = 50;
        const cardsCount = 10000;
        const tagsCount = 1000;

        let promises = [];

        for (let i = 1; decksCount >= i; i += 1) {
          promises.push(createDeck(`Deck: ${i}`, !!random(0, 1), {}));
        }

        await Promise.all(promises);
        promises = [];
        log('Decks created');

        for (let i = 1; cardsCount >= i; i += 1) {
          promises.push(
            createCard(
              random(1, decksCount),
              `Question: ${i}`,
              { answer: `Answer: ${i}` },
              0,
            ),
          );
        }

        await Promise.all(promises);
        promises = [];
        log('Cards created');

        for (let i = 1; tagsCount >= i; i += 1) {
          promises.push(createTag(random(1, decksCount), `Tag: ${i}`));
        }

        await Promise.all(promises);
        promises = [];
        log('Tags created');

        for (let i = 1; cardsCount >= i; i += random(1, 10)) {
          const tagIds = [
            ...new Set(
              [...Array(random(1, 10)).keys()].map(() => random(1, tagsCount)),
            ),
          ];

          promises.push(syncTagsToCard(i, tagIds));
        }

        await Promise.all(promises);
        log('CardTag created');
      });
  }

  mount() {
    const consoleElement = document.querySelector('#console') as HTMLElement;

    findRandomFeed()
      .then((feed) => {
        log('findRandomFeed', feed);
        consoleElement.innerHTML =
          feed?.getCard()?.getId().getIdentifier().toString() || 'not found';
      })
      .catch(error);

    // TODO opacity/transition
    this.rootElement.style.display = '';
  }

  destroy() {
    this.rootElement.style.display = 'none';
  }
}
