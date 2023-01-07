import Card from '../../../entities/card/model/Card';
import { h } from '../../../shared/util/dom';
import './cardVocabulary.scss';
import { CardVocabularyContent } from '../../../entities/card/model/content/cardVocabularyContent';

const renderVocabulary = (contentElement: HTMLElement, card: Card) => {
  const content = card.getContent() as CardVocabularyContent;

  // TODO dynamic text-size depends on text length

  contentElement.append(
    <div class="card-vocabulary-question">{card.getQuestion()}</div>,
    <div class="card-vocabulary-helper card-vocabulary-helper_clicked">
      {content.getAnswer()}
    </div>,
  );
};

export { renderVocabulary };
