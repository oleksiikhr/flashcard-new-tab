import Card from '../../Domain/Card/Card';
import { h } from '../../../Shared/Model/Util/dom';

export function displayCard(element: HTMLDivElement, card: Card): void {
  const title = h('div', { class: 'question' });
  title.textContent = card.getQuestion().getValue();

  element.append(title);
}

export default {
  displayCard,
};
