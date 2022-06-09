import {
  createTag,
  deleteTag,
  paginateTags,
  updateTag,
} from '../bootstrap/bus';
import { error, log } from '../../Domain/Shared/Util/logger';

export function tagTestHandle(root: HTMLElement): void {
  const consoleElement = document.querySelector('#tag-paginate') as HTMLElement;

  paginateTags(undefined, 10)
    .then((tags) => {
      let output = '';
      tags.forEach((tag) => {
        tag.getCardsCount();
        output += `${JSON.stringify({
          id: tag.getId().getIdentifier(),
          deck_id: tag.getDeckId().getIdentifier(),
          name: tag.getName().getValue(),
          cards_count: tag.getCardsCount(),
        })}\n`;
      });

      consoleElement.innerHTML = output.trimEnd();
    })
    .catch(error);

  root.querySelector('#tag-form-create')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const name = root.querySelector('#tag-create-name') as HTMLInputElement;
    const deckId = root.querySelector(
      '#tag-create-deck_id',
    ) as HTMLInputElement;

    createTag(+deckId.value, name.value)
      .then(log)
      .catch(error);
  });

  root.querySelector('#tag-form-edit')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = root.querySelector('#tag-edit-id') as HTMLInputElement;
    const name = root.querySelector('#tag-edit-name') as HTMLInputElement;

    updateTag(+id.value, name.value)
      .then(log)
      .catch(error);
  });

  root.querySelector('#tag-form-delete')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = root.querySelector('#tag-delete-id') as HTMLInputElement;

    deleteTag(+id.value)
      .then(log)
      .catch(error);
  });
}

export default {
  tagTestHandle,
};
