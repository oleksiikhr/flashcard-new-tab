import Card from '../../Domain/Card/Card';
import { h } from '../../Domain/Shared/Util/dom';
import {
  createCard,
  deleteCard,
  paginateCards,
  updateCard,
} from '../bootstrap/bus';
import { error, log } from '../../Domain/Shared/Util/logger';

export function cardTestHandle(root: HTMLElement): void {
  const consoleElement = document.querySelector(
    '#card-paginate',
  ) as HTMLElement;

  paginateCards(undefined, 10)
    .then((cards) => {
      let output = '';
      cards.forEach((card) => {
        output += `${JSON.stringify({
          id: card.getId().getIdentifier(),
          deck_id: card.getDeckId().getIdentifier(),
          question: card.getQuestion().getValue(),
          content: card.getContent().serialize(),
          statistics: card.getStatistics().serialize(),
        })}\n`;
      });

      consoleElement.innerHTML = output.trimEnd();
    })
    .catch(error);

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
