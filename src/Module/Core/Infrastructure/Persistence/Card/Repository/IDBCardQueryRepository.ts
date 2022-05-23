import Card from '../../../../Domain/Card/Card';
import CardId from '../../../../Domain/Card/CardId';
import CardQuestion from '../../../../Domain/Card/CardQuestion';
import CardContentFactory from '../../../../Domain/Card/Content/CardContentFactory';
import CardStatistics from '../../../../Domain/Card/CardStatistics';
import { CardQueryRepository } from '../../../../Domain/Card/Repository/CardQueryRepository';
import { CardTemplateType } from '../../../../Domain/Card/CardTemplateType';

export default class IDBCardQueryRepository implements CardQueryRepository {
  findById(id: number): Card {
    const templateType = CardTemplateType.QUESTION;

    return new Card(
      CardId.of(id),
      new CardQuestion('asd'),
      new CardContentFactory().make({}, templateType),
      templateType,
      new CardStatistics(),
      new Date(),
      new Date()
    );
  }
}
