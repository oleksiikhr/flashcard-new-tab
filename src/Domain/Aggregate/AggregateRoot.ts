import BusinessRule from './BusinessRule';
import BusinessRuleInvalid from '../Error/BusinessRuleInvalid';

export default class AggregateRoot {
  public async checkRule(rule: BusinessRule): Promise<void> {
    const isBroken = await rule.isBroken();

    if (isBroken) {
      throw new BusinessRuleInvalid(rule.errorMessage());
    }
  }
}
