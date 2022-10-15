import { CardContent } from './cardContentFactory';

export interface CardVocabularyContent extends CardContent {
  getAnswer(): string;
}

export const cardVocabularyContent = (content: {
  answer?: string;
}): CardVocabularyContent => {
  const answer = content.answer || '';

  return {
    getAnswer: () => answer,
    serialize: () => ({
      answer,
    }),
  };
};
