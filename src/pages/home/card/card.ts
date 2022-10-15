import Card, { CardTemplateType } from '../../../entities/card/model/Card';
import Tag from '../../../entities/tag/model/Tag';
import Deck from '../../../entities/deck/model/Deck';
import { numberCounter } from '../../../shared/util/animation';
import { h } from '../../../shared/util/dom';
import { renderVocabulary } from './cardVocabulary';
import './card.scss';

export default (card: Card, deck: Deck, tags: Tag[]) => {
  const element = document.querySelector('[component="card"]') as HTMLElement;

  (element.querySelector('.card-deck-name') as HTMLElement).innerText =
    deck.getName();

  numberCounter(
    element.querySelector('.card-clicks-value') as HTMLElement,
    card.getStatistics().clicks,
  );
  numberCounter(
    element.querySelector('.card-views-value') as HTMLElement,
    card.getStatistics().views,
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

  if (card.getTemplateType() === CardTemplateType.VOCABULARY) {
    element.classList.add('card_vocabulary');
    renderVocabulary(contentElement, card);
  }
};
