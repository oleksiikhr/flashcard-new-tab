import Card from '../../../Domain/Modules/Card/Card';
import CardVocabularyContent from '../../../Domain/Modules/Card/Content/CardVocabularyContent';
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
      card.getQuestion(),
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

export { renderVocabulary };
