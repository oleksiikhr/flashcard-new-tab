import Card from '../../../Domain/Card/Card';
import Tag from '../../../Domain/Tag/Tag';
import Deck from '../../../Domain/Deck/Deck';
import { numberCounter } from '../../helpers/animation';
import CardVocabularyContent from '../../../Domain/Card/Content/CardVocabularyContent';
import { h } from '../../../Domain/Shared/Util/dom';

const renderVocabulary = (
  element: HTMLElement,
  contentElement: HTMLElement,
  card: Card,
) => {
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

  if (content.getTranscription()) {
    contentElement.append(
      h(
        'div',
        {
          class: 'card-vocabulary-transcription',
        },
        h('span', undefined, content.getTranscription()),
      ),
    );

    // TODO svg
  }

  contentElement.append(
    h(
      'div',
      {
        class: 'card-vocabulary-helper',
      },
      'Show answer',
    ),
  );
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
    renderVocabulary(element, contentElement, card);
  }
};
