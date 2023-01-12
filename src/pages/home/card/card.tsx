import { Card, CardTemplateType } from '../../../entities/card/model/card';
import { renderVocabulary } from './cardVocabulary';
import './card.scss';

export default (card: Card) => {
  const element = document.querySelector('[component="card"]') as HTMLElement;

  const clicksElement = element.querySelector(
    '.card-views-value',
  ) as HTMLElement;
  clicksElement.innerText = card.statistics.clicks.toString();

  const viewsElement = element.querySelector(
    '.card-views-value',
  ) as HTMLElement;
  viewsElement.innerText = card.statistics.views.toString();

  const contentElement = element.querySelector('.card__content') as HTMLElement;
  contentElement.innerText = '';

  if (card.templateType === CardTemplateType.VOCABULARY) {
    element.classList.add('card_vocabulary');
    renderVocabulary(contentElement, card);
  }
};
