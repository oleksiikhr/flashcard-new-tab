import FeedCommandRepository from '../Repository/FeedCommandRepository';

export default class FeedCleaner {
  constructor(private commandRepository: FeedCommandRepository) {}

  public clear() {
    // this.commandRepository.clear();
  }
}
