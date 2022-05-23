import CardContent from './CardContent';

export default class CardDefaultContent implements CardContent {
  private readonly answer: string;

  constructor(content: { answer?: string }) {
    this.answer = content.answer ?? '';
  }

  serialize(): object {
    return {
      answer: this.answer,
    };
  }
}
