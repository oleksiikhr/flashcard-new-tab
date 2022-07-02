import Page from '../Page';
import {
  createDeck,
  findDeck,
  generateFeedByDeck,
  importDeckData,
} from '../../bootstrap/bus';
import { ImportRaw } from '../../../Application/Command/Deck/ImportDeckDataHandler';
import logger from '../../helpers/logger';

export default class SettingsPage implements Page {
  protected root!: HTMLDivElement;

  onFirstMount(): void {
    this.root = document.querySelector(`[page="settings"]`) as HTMLDivElement;

    this.root.querySelector('#create-deck')?.addEventListener('click', () => {
      findDeck(1)
        .then((deck) => {
          if (undefined === deck) {
            return createDeck('Eng - Ukr', true, {
              recalculate: { hours: 1, count: 100, algorithm: 'random' },
            });
          }

          return Promise.resolve(undefined);
        })
        .catch((err: unknown) =>
          logger.error('SettingsPage', 'createDeck', 'click', { err }),
        );
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
        } catch (err) {
          // TODO logger
          return;
        }

        importDeckData(1, data).catch((err: unknown) =>
          logger.error('SettingsPage', 'importDeckData', 'click', { err }),
        );
      };

      fileReader.readAsText(files.item(0) as File);
    });

    this.root.querySelector('#generate-feed')?.addEventListener('click', () => {
      generateFeedByDeck(1).catch((err: unknown) =>
        logger.error('SettingsPage', 'generateFeed', 'click', { err }),
      );
    });
  }

  mount(): void {
    this.root.style.display = '';
  }

  destroy(): void {
    this.root.style.display = 'none';
  }
}
