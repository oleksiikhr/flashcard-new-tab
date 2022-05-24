import Page from './Page';

export default class PageManager {
  private instances: Map<string, Page> = new Map();

  private current: Page | null = null;

  public setPage(page: { new (): Page }): void {
    let instance = this.instances.get(page.name);

    if (undefined === instance) {
      // eslint-disable-next-line new-cap
      instance = new page();

      instance.onFirstMount();

      this.instances.set(page.name, instance);
    }

    if (null !== this.current) {
      this.current.destroy();
    }

    instance.mount();

    this.current = instance;
  }
}
