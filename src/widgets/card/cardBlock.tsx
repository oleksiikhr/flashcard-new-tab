import { Card, CardTemplateType } from '../../entities/card/model/card';
import { renderVocabulary } from './content/cardVocabularyContent';
import './cardBlock.scss';
import { innerText } from '../../shared/util/dom';

export const renderCardBlock = (card: Card) => {
  const element = document.querySelector(
    '[component="card"] .card',
  ) as HTMLElement;
  const contentElement = element.querySelector('.card__content') as HTMLElement;

  innerText('.card-icon_views .card-icon__value', card.statistics.views);
  innerText(
    '.card-icon_remembered .card-icon__value',
    card.statistics.remembered,
  );
  innerText('.card-icon_forgot .card-icon__value', card.statistics.forgot);

  switch (card.templateType) {
    case CardTemplateType.VOCABULARY:
      element.classList.add('card_type_vocabulary');
      contentElement.replaceChildren(renderVocabulary(card));
      break;
    default:
      contentElement.innerText = 'Something went wrong';
  }
};
