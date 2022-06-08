import {
  createDeck,
  deleteDeck,
  paginateDecks,
  updateDeck,
} from '../bootstrap/bus';
import { error, log } from '../../Domain/Shared/Util/logger';

export function deckTestHandle(root: HTMLElement): void {
  const consoleElement = document.querySelector(
    '#deck-paginate',
  ) as HTMLElement;

  setInterval(() => {
    paginateDecks(undefined, 10)
      .then((decks) => {
        let output = '';
        decks.forEach((deck) => {
          output += `${JSON.stringify({
            id: deck.getId().getIdentifier(),
            name: deck.getName().getValue(),
            cards_count: deck.getCardsCount(),
            tags_count: deck.getTagsCount(),
            is_active: deck.getIsActive(),
          })}\n`;
        });

        consoleElement.innerHTML = output.trimEnd();
      })
      .catch(error);
  }, 1000);

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
