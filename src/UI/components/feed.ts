import { generateFeed } from '../bootstrap/bus';
import { error, log } from '../../Domain/Shared/Util/logger';

export function feedTestHandle(root: HTMLElement): void {
  root
    .querySelector('#feed-form-generate')
    ?.addEventListener('submit', (evt) => {
      evt.preventDefault();

      generateFeed(10).then(log).catch(error);
    });
}

export default {
  feedTestHandle,
};
