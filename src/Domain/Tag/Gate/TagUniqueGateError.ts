import Tag from '../Tag';

export default class TagUniqueGateError extends Error {
  constructor(private tag: Tag) {
    super('Tag with this Deck and the name already exists');
  }

  public getTag(): Tag {
    return this.tag;
  }
}
