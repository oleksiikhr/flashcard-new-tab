import Page from '../Page';
import {
  createDeck,
  findDeck,
  generateFeed,
  importDeckData,
} from '../../bootstrap/bus';
import { error, log } from '../../../Domain/Shared/Util/logger';
import { ImportRaw } from '../../../Application/Command/Deck/ImportDeckDataHandler';

export default class SettingsPage implements Page {
  protected root!: HTMLDivElement;

  onFirstMount() {
    this.root = document.querySelector(`[page="settings"]`) as HTMLDivElement;

    this.root.querySelector('#create-deck')?.addEventListener('click', () => {
      findDeck(1)
        .then((deck) => {
          if (undefined === deck) {
            return createDeck('Eng - Ukr', true, {
              recalculate: { hours: 1, count: 100, algorithm: 'random' },
            })
              .then(log)
              .catch(error);
          }

          return Promise.resolve();
        })
        .catch(error);
    });

    this.root.querySelector('#import')?.addEventListener('click', () => {
      const { files } = this.root.querySelector('#file') as HTMLInputElement;

      if (null === files || 0 === files.length) {
        return;
      }

      const fileReader = new FileReader();
      fileReader.onload = (evt) => {
        if (null === evt.target || 'string' !== typeof evt.target.result) {
          return;
        }

        let data: ImportRaw[] = [];

        try {
          data = JSON.parse(evt.target.result) as ImportRaw[];
        } catch (e) {
          error(e);
          return;
        }

        importDeckData(1, data).then(log).catch(error);
      };

      fileReader.readAsText(files.item(0) as File);
    });

    this.root.querySelector('#generate-feed')?.addEventListener('click', () => {
      generateFeed(10).then(log).catch(error);
    });
  }

  mount() {
    this.root.style.display = '';
  }

  destroy() {
    this.root.style.display = 'none';
  }
}
