import CardTemplateType from '../CardTemplateType';

export default class ContentNotSupportedByTemplateTypeError extends Error {
  constructor(private templateType: CardTemplateType) {
    super();
  }

  public getTemplateType(): CardTemplateType {
    return this.templateType;
  }
}
