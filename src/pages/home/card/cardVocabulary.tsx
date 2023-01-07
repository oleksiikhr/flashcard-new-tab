import { h } from '../../../shared/util/dom';
import './cardVocabulary.scss';
import { CardVocabularyContent } from '../../../entities/card/model/content/cardVocabularyContent';
import { Card } from '../../../entities/card/model/card';

const renderVocabulary = (contentElement: HTMLElement, card: Card) => {
  const content = card.content as CardVocabularyContent;

  // TODO dynamic text-size depends on text length

  contentElement.append(
    <div class="card-vocabulary-question">{card.question}</div>,
    <div class="card-vocabulary-helper card-vocabulary-helper_clicked">
      {content.getAnswer()}
    </div>,
  );
};

export { renderVocabulary };
