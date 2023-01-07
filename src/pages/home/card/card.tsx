import { Card, CardTemplateType } from '../../../entities/card/model/card';
import { h } from '../../../shared/util/dom';
import { renderVocabulary } from './cardVocabulary';
import './card.scss';
import { Deck } from '../../../entities/deck/model/deck';
import { Tag } from '../../../entities/tag/model/tag';

export default (card: Card, deck: Deck, tags: Tag[]) => {
  const element = document.querySelector('[component="card"]') as HTMLElement;

  (element.querySelector('.card-deck-name') as HTMLElement).innerText =
    deck.name;

  const clicksElement = element.querySelector(
    '.card-views-value',
  ) as HTMLElement;
  clicksElement.innerText = card.statistics.clicks.toString();

  const viewsElement = element.querySelector(
    '.card-views-value',
  ) as HTMLElement;
  viewsElement.innerText = card.statistics.views.toString();

  const tagsElement = document.querySelector('.card-tag-values') as HTMLElement;
  tagsElement.innerText = '';

  tags.forEach((tag) => {
    tagsElement.append(<span class="card-tag-value">{tag.name}</span>);
  });

  const contentElement = element.querySelector('.card__content') as HTMLElement;
  contentElement.innerText = '';

  if (card.templateType === CardTemplateType.VOCABULARY) {
    element.classList.add('card_vocabulary');
    renderVocabulary(contentElement, card);
  }
};
