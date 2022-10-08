import Card from '../../../../Domain/Modules/Card/Card';
import Tag from '../../../../Domain/Modules/Tag/Tag';
import Deck from '../../../../Domain/Modules/Deck/Deck';
import { numberCounter } from '../../../helper/animation';
import { h } from '../../../helper/dom';
import { renderVocabulary } from './cardVocabulary';

export default (card: Card, deck: Deck, tags: Tag[]) => {
  const element = document.querySelector('[component="card"]') as HTMLElement;

  (element.querySelector('.card-deck-name') as HTMLElement).innerText =
    deck.getName();

  numberCounter(
    element.querySelector('.card-clicks-value') as HTMLElement,
    card.getStatistics().getClicks(),
  );
  numberCounter(
    element.querySelector('.card-views-value') as HTMLElement,
    card.getStatistics().getViews(),
  );

  const tagsElement = document.querySelector('.card-tag-values') as HTMLElement;
  tagsElement.innerText = '';

  tags.forEach((tag) => {
    tagsElement.append(
      h(
        'span',
        {
          class: 'card-tag-value',
        },
        tag.getName(),
      ),
    );
  });

  const contentElement = element.querySelector('.card__content') as HTMLElement;
  contentElement.innerText = '';

  if (card.getTemplateType().isVocabulary()) {
    element.classList.add('card_vocabulary');
    renderVocabulary(contentElement, card);
  }
};
