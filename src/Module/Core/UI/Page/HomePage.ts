import SettingsPage from './SettingsPage';
import { pageManager } from '../../../../Extension/bootstrap/services';
import Page from '../Page';
import { findActiveCardHandler } from '../../../../Extension/bootstrap/bus';
import FindActiveCardCommand from '../../Application/Query/Card/FindActiveCardCommand';
import { error } from '../../../Shared/Model/Util/notification';
import { displayCard } from '../Component/card';

export default class HomePage implements Page {
  protected rootElement!: HTMLDivElement;

  protected cardElement!: HTMLDivElement;

  onFirstMount() {
    this.rootElement = document.querySelector(
      `[page="home"]`
    ) as HTMLDivElement;

    this.cardElement = document.querySelector(
      `[component="card"]`
    ) as HTMLDivElement;

    this.rootElement.querySelector('#btn-1')?.addEventListener('click', () => {
      pageManager.setPage(SettingsPage);
    });
  }

  mount() {
    // TODO Feed handler
    findActiveCardHandler
      .invoke(new FindActiveCardCommand())
      .then((card) => {
        if (undefined !== card) {
          displayCard(this.cardElement, card);
        }
      })
      .catch((err) => error(err));

    // TODO opacity/transition
    this.rootElement.style.display = '';
  }

  destroy() {
    this.rootElement.style.display = 'none';
  }
}
