import {
  createDeck,
  deleteDeck,
  findDeck,
  paginateDecks,
  updateDeck,
} from '../bootstrap/bus';
import { error, log } from '../../Domain/Shared/Util/logger';

export function deckTestHandle(root: HTMLElement): void {
  const consoleElement = document.querySelector('#console') as HTMLElement;

  root
    .querySelector('#deck-form-paginate')
    ?.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const fromId = root.querySelector(
        '#deck-paginate-from_id',
      ) as HTMLInputElement;
      const limit = root.querySelector(
        '#deck-paginate-limit',
      ) as HTMLInputElement;

      paginateDecks(+fromId.value || undefined, +limit.value)
        .then((decks) => {
          log(decks);
          consoleElement.innerHTML = JSON.stringify(decks, null, '\t');
        })
        .catch(error);
    });

  root.querySelector('#deck-form-view')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = root.querySelector('#deck-view-id') as HTMLInputElement;

    findDeck(+id.value)
      .then((deck) => {
        log(deck);
        consoleElement.innerHTML = JSON.stringify(deck, null, '\t');
      })
      .catch(error);
  });

  root.querySelector('#deck-form-create')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const name = root.querySelector('#deck-create-name') as HTMLInputElement;
    const isActive = root.querySelector(
      '#deck-create-is_active',
    ) as HTMLInputElement;

    createDeck(name.value, isActive.checked, {}).then(log).catch(error);
  });

  root.querySelector('#deck-form-edit')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = root.querySelector('#deck-edit-id') as HTMLInputElement;
    const name = root.querySelector('#deck-edit-name') as HTMLInputElement;
    const isActive = root.querySelector(
      '#deck-edit-is_active',
    ) as HTMLInputElement;

    updateDeck(+id.value, name.value, isActive.checked, {})
      .then(log)
      .catch(error);
  });

  root.querySelector('#deck-form-delete')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = root.querySelector('#deck-delete-id') as HTMLInputElement;

    deleteDeck(+id.value)
      .then(log)
      .catch(error);
  });
}

export default {
  deckTestHandle,
};
