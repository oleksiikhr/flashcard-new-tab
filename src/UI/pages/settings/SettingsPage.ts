import Page from '../Page';
import {
  createDeck,
  deleteDeck,
  generateFeedByDeck,
  importCards,
  paginateDecks,
} from '../../bootstrap/bus';
import { ImportRaw } from '../../../Application/Command/Card/ImportCardsHandler';
import logger from '../../helpers/logger';
import { h } from '../../../Domain/Shared/Util/dom';
import { shuffle } from '../../../Domain/Shared/Util/algorithm';

// TODO Demo version, refactor code

export default class SettingsPage implements Page {
  protected root!: HTMLDivElement;

  protected fetchAboutElement!: HTMLDivElement;

  protected decksListElement!: HTMLDivElement;

  protected processElement!: HTMLDivElement;

  protected abortController?: AbortController;

  onFirstMount(): void {
    this.root = document.querySelector(`[page="settings"]`) as HTMLDivElement;
    this.fetchAboutElement = this.root.querySelector(
      '#fetch-abort',
    ) as HTMLDivElement;
    this.decksListElement = this.root.querySelector(
      '#decks-list',
    ) as HTMLDivElement;
    this.processElement = this.root.querySelector('#process') as HTMLDivElement;

    this.fetchAboutElement.addEventListener('click', () => {
      if (undefined !== this.abortController) {
        this.abortController.abort();
      }
    });

    this.root
      .querySelector('#create-deck-button')
      ?.addEventListener('click', () => {
        createDeck('Eng - Ukr', true, {
          recalculate: { hours: 1, count: 50, algorithm: 'random' },
        })
          .then(() => {
            this.process('Deck created');
            this.renderDecks();
          })
          .catch((err: unknown) => {
            this.process('Something went wrong');
            logger.error('SettingsPage', 'createDeck', 'click', { err });
          });
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

        importCards(1, data).catch((err: unknown) =>
          logger.error('SettingsPage', 'importCards', 'click', { err }),
        );
      };

      fileReader.readAsText(files.item(0) as File);
    });
  }

  mount(): void {
    this.renderDecks();

    this.root.style.display = '';
  }

  destroy(): void {
    this.root.style.display = 'none';
  }

  private renderDecks(): void {
    paginateDecks(undefined, 10)
      .then((decks) => {
        this.decksListElement.innerText = '';

        decks.forEach((deck) => {
          const recalculate = deck.getSettings().getRecalculate();

          this.decksListElement.append(
            h(
              'div',
              {
                style:
                  'display: inline-block; border: 1px solid; padding: 15px; font-size: 1.5em; text-align: left; margin: 10px;',
              },
              h(
                'div',
                {},
                h('strong', {}, 'ID: '),
                h('span', {}, deck.getId().getIdentifier().toString()),
              ),
              h(
                'div',
                {},
                h('strong', {}, 'Name: '),
                h('span', {}, deck.getName().getValue()),
              ),
              h(
                'div',
                {},
                h('strong', {}, 'Cards/Active: '),
                h(
                  'span',
                  {},
                  `${deck.getCardsCount()}/${deck.getActiveCardsCount()}`,
                ),
              ),
              h(
                'div',
                {},
                h('strong', {}, 'Next generate feed: '),
                h('span', {}, deck.getGeneratedAt().toLocaleString()),
              ),
              h(
                'div',
                {},
                h('strong', {}, 'Settings: '),
                h(
                  'span',
                  {},
                  `Recalculate Feed (hours: ${recalculate.hours}, count: ${recalculate.count})`,
                ),
              ),
              h('br'),
              h(
                'div',
                {
                  style: 'font-weight: bold; text-align: center;',
                },
                'Action',
              ),
              h('br'),
              h(
                'button',
                {
                  click: () => {
                    deleteDeck(deck.getId().getIdentifier())
                      .then(() => {
                        this.process('Deck deleted');
                        this.renderDecks();
                      })
                      .catch((err: unknown) => {
                        this.process('Something went wrong');
                        logger.error('SettingsPage', 'deleteDeck', 'click', {
                          err,
                        });
                      });
                  },
                },
                'Delete Deck',
              ),
              h(
                'button',
                {
                  click: () => {
                    generateFeedByDeck(deck.getId().getIdentifier())
                      .then(() => {
                        this.process('Feed regenerated');
                      })
                      .catch((err: unknown) => {
                        this.process('Something went wrong');
                        logger.error('SettingsPage', 'generateFeed', 'click', {
                          err,
                        });
                      });
                  },
                },
                'Generate Feed',
              ),
              h('br'),
              h('br'),
              h(
                'div',
                {
                  style: 'font-weight: bold; text-align: center;',
                },
                'Import Cards',
              ),
              h('br'),
              h(
                'button',
                {
                  click: () => {
                    this.importCards(deck.getId().getIdentifier(), 10).catch(
                      (err: unknown) => {
                        logger.error('SettingsPage', 'import-10', 'click', {
                          err,
                        });
                      },
                    );
                  },
                },
                'Random 10',
              ),
              h(
                'button',
                {
                  click: () => {
                    this.importCards(deck.getId().getIdentifier(), 1000).catch(
                      (err: unknown) => {
                        logger.error('SettingsPage', 'import-1000', 'click', {
                          err,
                        });
                      },
                    );
                  },
                },
                'Random 1000',
              ),
              h(
                'button',
                {
                  click: () => {
                    this.importCards(deck.getId().getIdentifier()).catch(
                      (err: unknown) => {
                        logger.error('SettingsPage', 'import-all', 'click', {
                          err,
                        });
                      },
                    );
                  },
                },
                'All (~73k)',
              ),
              h('br'),
              h('div', {}, ''),
            ),
          );
        });
      })
      .catch((err: unknown) => {
        logger.error('SettingsPage', 'renderDecks', 'click', {
          err,
        });
      });
  }

  private async importCards(deckId: number, count?: number) {
    this.abortIfNeeded();
    this.process('Downloading the file..');
    this.fetchAboutElement.style.display = '';
    this.abortController = new AbortController();

    let data = (await fetch(
      'https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/storage/storage/eng-ukr.json',
      { signal: this.abortController.signal },
    )
      .then((response) => response.json())
      .finally(() => {
        this.fetchAboutElement.style.display = 'none';
      })) as ImportRaw[];

    this.process('Preparing data..');

    if (null !== count) {
      shuffle(data);

      data = data.slice(0, count);
    }

    let imported = 0;

    return importCards(deckId, data, () => {
      imported += 1;
      this.process(`Importing: ${imported}`);
    })
      .then(() => {
        this.process('Cards imported');
        this.renderDecks();
      })
      .catch((err: unknown) => {
        this.process('Something went wrong');
        logger.error('SettingsPage', 'importCards', 'click', { err });
      });
  }

  private abortIfNeeded() {
    if (undefined !== this.abortController) {
      this.abortController.abort();
    }
  }

  private process(message: string) {
    this.processElement.innerText = message;
  }
}
