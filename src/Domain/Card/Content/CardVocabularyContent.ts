import CardContent from './CardContent';

export default class CardVocabularyContent implements CardContent {
  private readonly answer: string;

  private readonly transcription: string;

  constructor(content: { answer?: string; transcription?: string }) {
    this.answer = content.answer || '';
    this.transcription = content.transcription || '';
  }

  public static create(answer: string, transcription: string) {
    return new CardVocabularyContent({
      answer: answer.trim(),
      transcription: transcription.trim(),
    });
  }

  public getAnswer(): string {
    return this.answer;
  }

  public getTranscription(): string {
    return this.transcription;
  }

  serialize(): object {
    return {
      answer: this.answer,
      transcription: this.transcription,
    };
  }
}
