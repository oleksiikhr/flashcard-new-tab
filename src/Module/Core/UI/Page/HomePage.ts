import SettingsPage from './SettingsPage';
import { pageManager } from '../../../../Extension/bootstrap/services';
import Page from '../Page';

export default class HomePage implements Page {
  protected root!: HTMLDivElement;

  onFirstMount() {
    this.root = document.querySelector(`[page="home"]`) as HTMLDivElement;
    const btn = this.root.querySelector('#btn-1') as HTMLDivElement;

    btn.addEventListener('click', () => {
      pageManager.setPage(SettingsPage);
    });

    // TODO register components
  }

  mount() {
    // TODO opacity/transition
    this.root.style.display = '';
  }

  destroy() {
    this.root.style.display = 'none';
  }
}
