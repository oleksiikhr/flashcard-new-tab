import Page from './Page';

export default class SettingsPage implements Page {
  protected root!: HTMLDivElement;

  onFirstMount() {
    this.root = document.querySelector(`[page="settings"]`) as HTMLDivElement;
  }

  mount() {
    this.root.style.display = '';
  }

  destroy() {
    this.root.style.display = 'none';
  }
}
