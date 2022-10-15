import { h } from '../../shared/util/dom';
import { shuffle } from '../../shared/util/algorithm';
import {
  importCards,
  ImportRaw,
} from '../../entities/card/useCases/importCards';
import { paginateDecksRequest } from '../../entities/deck/database/requests/paginateDecksRequest';
import { deleteDeck } from '../../entities/deck/useCases/deleteDeck';
import { createDeck } from '../../entities/deck/useCases/createDeck';
import { generateFeedByDeck } from '../../entities/feed/useCases/generateFeedByDeck';

const renderSettingsPage = () => {
  const rootElement = document.querySelector(
    `[page="settings"]`,
  ) as HTMLDivElement;
  const decksListElement = rootElement.querySelector(
    '#decks-list',
  ) as HTMLDivElement;
  const processElement = rootElement.querySelector(
    '#process',
  ) as HTMLDivElement;

  function process(message: string) {
    processElement.innerText = message;
  }

  const importBulkCards = async (deckId: number, count?: number) => {
    process('Downloading the file..');

    let data = (await fetch(
      'https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/storage/storage/eng-ukr.json',
    ).then((response) => response.json())) as ImportRaw[];

    process('Preparing data..');

    if (null !== count) {
      shuffle(data);

      data = data.slice(0, count);
    }

    let imported = 0;

    return importCards(deckId, data, () => {
      imported += 1;
      process(`Importing: ${imported}`);
    })
      .then(() => {
        process('Cards imported');
      })
      .catch((err: unknown) => {
        process('Something went wrong');
        console.error(err);
      });
  };

  const renderDecks = () => {
    paginateDecksRequest(undefined, 10)
      .then((decks) => {
        decksListElement.innerText = '';

        decks.forEach((deck) => {
          const { recalculate } = deck.getSettings();

          decksListElement.append(
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
                h('span', {}, deck.getId().toString()),
              ),
              h(
                'div',
                {},
                h('strong', {}, 'Name: '),
                h('span', {}, deck.getName()),
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
                    deleteDeck(deck.getId())
                      .then(() => {
                        process('Deck deleted');
                        renderDecks();
                      })
                      .catch((err: unknown) => {
                        process('Something went wrong');
                        console.error(err);
                      });
                  },
                },
                'Delete Deck',
              ),
              h(
                'button',
                {
                  click: () => {
                    generateFeedByDeck(deck.getId())
                      .then(() => {
                        process('Feed regenerated');
                      })
                      .catch((err: unknown) => {
                        process('Something went wrong');
                        console.error(err);
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
                    importBulkCards(deck.getId(), 10).catch((err: unknown) => {
                      console.error(err);
                    });
                  },
                },
                'Random 10',
              ),
              h(
                'button',
                {
                  click: () => {
                    importBulkCards(deck.getId(), 1000).catch(
                      (err: unknown) => {
                        console.error(err);
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
                    importBulkCards(deck.getId()).catch((err: unknown) => {
                      console.error(err);
                    });
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
        console.error(err);
      });
  };

  rootElement
    .querySelector('#create-deck-button')
    ?.addEventListener('click', () => {
      createDeck('Eng - Ukr', true, {
        recalculate: { hours: 24, count: 50, algorithm: 'random' },
      })
        .then(() => {
          process('Deck created');
          renderDecks();
        })
        .catch((err: unknown) => {
          process('Something went wrong');
          console.error(err);
        });
    });

  rootElement.querySelector('#import')?.addEventListener('click', () => {
    const { files } = rootElement.querySelector('#file') as HTMLInputElement;

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
        console.error(err);
        return;
      }

      importCards(1, data).catch((err: unknown) => console.error(err));
    };

    fileReader.readAsText(files.item(0) as File);
  });

  renderDecks();

  rootElement.style.display = '';
};

export { renderSettingsPage };
