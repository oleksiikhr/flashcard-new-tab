import Card from '../../../Domain/Card/Card';
import Tag from '../../../Domain/Tag/Tag';
import Deck from '../../../Domain/Deck/Deck';
import { numberCounter } from '../../helper/animation';
import CardVocabularyContent from '../../../Domain/Card/Content/CardVocabularyContent';
import { h } from '../../helper/dom';

const renderVocabulary = (contentElement: HTMLElement, card: Card) => {
  const content = card.getContent() as CardVocabularyContent;

  // TODO dynamic text-size depends on text length

  contentElement.append(
    h(
      'div',
      {
        class: 'card-vocabulary-question',
      },
      card.getQuestion().getValue(),
    ),
  );

  const helperElement = h(
    'div',
    {
      class: 'card-vocabulary-helper',
    },
    'Show answer',
  );

  helperElement.innerText = content.getAnswer();
  helperElement.classList.add('card-vocabulary-helper_clicked');
  // helperElement.addEventListener('click', () => {
  //   increaseCardClicks(card.getId().getIdentifier(), 1).then((card) => {
  //     (element.querySelector('.card-clicks-value') as HTMLElement).innerText =
  //       card.getStatistics().getClicks().toString();
  //   });
  // });

  contentElement.append(helperElement);
};

export default (card: Card, deck: Deck, tags: Tag[]) => {
  const element = document.querySelector('[component="card"]') as HTMLElement;

  (element.querySelector('.card-deck-name') as HTMLElement).innerText = deck
    .getName()
    .getValue();

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
        tag.getName().getValue(),
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
