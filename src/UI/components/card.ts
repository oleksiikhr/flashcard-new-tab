import Card from '../../Domain/Card/Card';
import { h } from '../../Domain/Shared/Util/dom';
import {
  createCard,
  deleteCard,
  findCard,
  paginateCards,
  updateCard,
} from '../bootstrap/bus';
import { error, log } from '../../Domain/Shared/Util/logger';

export function cardTestHandle(root: HTMLElement): void {
  const consoleElement = document.querySelector('#console') as HTMLElement;

  root
    .querySelector('#card-form-paginate')
    ?.addEventListener('submit', (evt) => {
      evt.preventDefault();

      const fromId = root.querySelector(
        '#card-paginate-from_id',
      ) as HTMLInputElement;
      const limit = root.querySelector(
        '#card-paginate-limit',
      ) as HTMLInputElement;

      paginateCards(+fromId.value || undefined, +limit.value)
        .then((cards) => {
          log(cards);
          consoleElement.innerHTML = JSON.stringify(cards, null, '\t');
        })
        .catch(error);
    });

  root.querySelector('#card-form-view')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = root.querySelector('#card-view-id') as HTMLInputElement;

    findCard(+id.value)
      .then((deck) => {
        log(deck);
        consoleElement.innerHTML = JSON.stringify(deck, null, '\t');
      })
      .catch(error);
  });

  root.querySelector('#card-form-create')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const deckId = root.querySelector(
      '#card-create-deck_id',
    ) as HTMLInputElement;
    const question = root.querySelector(
      '#card-create-question',
    ) as HTMLInputElement;
    const answer = root.querySelector(
      '#card-create-answer',
    ) as HTMLInputElement;

    createCard(+deckId.value, question.value, { answer: answer.value }, 0)
      .then(log)
      .catch(error);
  });

  root.querySelector('#card-form-edit')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = root.querySelector('#card-edit-id') as HTMLInputElement;
    const question = root.querySelector(
      '#card-edit-question',
    ) as HTMLInputElement;
    const answer = root.querySelector('#card-edit-answer') as HTMLInputElement;

    updateCard(+id.value, question.value, { answer: answer.value }, 0)
      .then(log)
      .catch(error);
  });

  root.querySelector('#card-form-delete')?.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const id = root.querySelector('#card-delete-id') as HTMLInputElement;

    deleteCard(+id.value)
      .then(log)
      .catch(error);
  });
}

export function displayCard(element: HTMLDivElement, card: Card): void {
  const title = h('div', { class: 'question' });
  title.textContent = card.getQuestion().getValue();

  element.append(title);
}

export default {
  displayCard,
};
