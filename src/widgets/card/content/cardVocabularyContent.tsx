import { h } from '../../../shared/util/dom';
import { CardVocabularyContent } from '../../../entities/card/model/content/cardVocabularyContent';
import { Card } from '../../../entities/card/model/card';
import './cardVocabularyContent.scss';

export const renderVocabulary = (card: Card) => {
  const content = card.content as CardVocabularyContent;

  const questionElement = (
    <div class="card-vocabulary-question">{card.question}</div>
  );
  const answerElement = (
    <div class="card-vocabulary-answer">{content.getAnswer()}</div>
  );

  const showAnswer = () => {
    questionElement.classList.add('card-vocabulary-question_clicked');
    answerElement.classList.add('card-vocabulary-answer_displayed');
  };

  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.code !== 'Space') {
      return;
    }

    showAnswer();
    // document.removeEventListener('keydown', keyDownHandler)
  };

  document.addEventListener('keydown', keyDownHandler);

  questionElement.addEventListener('click', () => showAnswer(), { once: true });

  return (
    <div>
      {questionElement}
      {answerElement}
    </div>
  );
};
