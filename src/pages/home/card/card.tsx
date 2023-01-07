import Card, { CardTemplateType } from '../../../entities/card/model/Card';
import Tag from '../../../entities/tag/model/Tag';
import Deck from '../../../entities/deck/model/Deck';
import { h } from '../../../shared/util/dom';
import { renderVocabulary } from './cardVocabulary';
import './card.scss';

export default (card: Card, deck: Deck, tags: Tag[]) => {
  const element = document.querySelector('[component="card"]') as HTMLElement;

  (element.querySelector('.card-deck-name') as HTMLElement).innerText =
    deck.getName();

  const clicksElement = element.querySelector(
    '.card-views-value',
  ) as HTMLElement;
  clicksElement.innerText = card.getStatistics().clicks.toString();

  const viewsElement = element.querySelector(
    '.card-views-value',
  ) as HTMLElement;
  viewsElement.innerText = card.getStatistics().views.toString();

  const tagsElement = document.querySelector('.card-tag-values') as HTMLElement;
  tagsElement.innerText = '';

  tags.forEach((tag) => {
    tagsElement.append(<span class="card-tag-value">{tag.getName()}</span>);
  });

  const contentElement = element.querySelector('.card__content') as HTMLElement;
  contentElement.innerText = '';

  if (card.getTemplateType() === CardTemplateType.VOCABULARY) {
    element.classList.add('card_vocabulary');
    renderVocabulary(contentElement, card);
  }
};
