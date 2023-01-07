import { h } from '../../shared/util/dom';
import { shuffle } from '../../shared/util/algorithm';
import {
  importCards,
  ImportRaw,
} from '../../entities/card/model/actions/importCards';
import { paginateDecksRequest } from '../../entities/deck/database/requests/paginateDecksRequest';
import { deleteDeck } from '../../entities/deck/model/actions/deleteDeck';
import { createDeck } from '../../entities/deck/model/actions/createDeck';
import { generateFeedByDeck } from '../../entities/feed/service/actions/generateFeedByDeck';

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

  const importBulkCards = async (deckId: string, count?: number) => {
    process('Downloading the file..');

    let data = (await fetch(
      'https://raw.githubusercontent.com/oleksiikhr/flashcard-new-tab/storage/storage/eng-ukr.json',
    ).then((response) => response.json())) as ImportRaw[];

    process('Preparing data..');

    if (count !== null) {
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
      .catch((err) => {
        process('Something went wrong');
        console.error(err);
      });
  };

  const renderDecks = () => {
    paginateDecksRequest(undefined, 10)
      .then((decks) => {
        decksListElement.innerText = '';

        decks.forEach((deck) => {
          const { recalculate } = deck.settings;

          decksListElement.append(
            <div style="display: inline-block; border: 1px solid; padding: 15px; font-size: 1.5em; text-align: left; margin: 10px;">
              <div>
                <strong>ID: </strong>
                <span>{deck.id}</span>
              </div>
              <div>
                <strong>Name: </strong>
                <span>{deck.name}</span>
              </div>
              <div>
                <strong>Cards/Active: </strong>
                <span>
                  {deck.metadata.cardsCount}/{deck.metadata.activeCardsCount}
                </span>
              </div>
              <div>
                <strong>Next generate feed: </strong>
                <span>{deck.generateAt.toLocaleString()}</span>
              </div>
              <div>
                <strong>Settings: </strong>
                <span>
                  Recalculate Feed (hours: {recalculate.hours}, count:{' '}
                  {recalculate.count})
                </span>
              </div>
              <br />
              <div style="font-weight: bold; text-align: center">Action</div>
              <br />
              <button
                click={() => {
                  deleteDeck(deck.id)
                    .then(() => {
                      process('Deck deleted');
                      renderDecks();
                    })
                    .catch((err) => {
                      process('Something went wrong');
                      console.error(err);
                    });
                }}
              >
                Delete Deck
              </button>
              <button
                click={() => {
                  generateFeedByDeck(deck.id)
                    .then(() => {
                      process('Feed regenerated');
                    })
                    .catch((err) => {
                      process('Something went wrong');
                      console.error(err);
                    });
                }}
              >
                Generate Feed
              </button>
              <br />
              <br />
              <div style="font-weight: bold; text-align: center">
                Import Cards
              </div>
              <br />
              <button
                click={() => {
                  importBulkCards(deck.id, 10).catch((err) => {
                    console.error(err);
                  });
                }}
              >
                Random 10
              </button>
              <button
                click={() => {
                  importBulkCards(deck.id, 1000).catch((err) => {
                    console.error(err);
                  });
                }}
              >
                Random 1000
              </button>
              <button
                click={() => {
                  importBulkCards(deck.id).catch((err) => {
                    console.error(err);
                  });
                }}
              >
                All (~73k)
              </button>
              <br />
            </div>,
          );
        });
      })
      .catch((err) => {
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
        .catch((err) => {
          process('Something went wrong');
          console.error(err);
        });
    });

  renderDecks();

  rootElement.style.display = '';
};

export { renderSettingsPage };
