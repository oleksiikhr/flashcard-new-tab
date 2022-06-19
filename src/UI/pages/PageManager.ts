import Page from './Page';
import HomePage from './home/HomePage';
import SettingsPage from './settings/SettingsPage';

export class PageManager {
  private pages: Map<string, { new (): Page }> = new Map();

  private instances: Map<string, Page> = new Map();

  private current: Page | null = null;

  constructor(pages: { name: string; page: { new (): Page } }[]) {
    pages.forEach(({ name, page }) => {
      this.pages.set(name, page);
    });
  }

  public render(name: string): void {
    let instance = this.instances.get(name);

    if (undefined === instance) {
      const page = this.pages.get(name);

      if (undefined === page) {
        throw new Error(`Page not registered: ${name}`);
      }

      // eslint-disable-next-line new-cap
      instance = new page();

      instance.onFirstMount();

      this.instances.set(name, instance);
    }

    if (null !== this.current) {
      this.current.destroy();
    }

    instance.mount();

    this.current = instance;
  }
}

export default new PageManager([
  { name: 'home', page: HomePage },
  { name: 'settings', page: SettingsPage },
]);
