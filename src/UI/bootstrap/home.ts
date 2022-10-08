import themeToggler from '../pages/home/theme/toggler';
import { generateFeed } from '../../Application/Feed/GenerateFeed';
import { renderHomePage } from '../pages/home/render';
import '../styles/index.scss';

themeToggler.register();

window.addEventListener('DOMContentLoaded', () => {
  renderHomePage();
});

// TODO Refactor, delay regenerate feed
setTimeout(() => {
  // TODO Delete on next release
  navigator.serviceWorker
    ?.getRegistrations()
    .then((registrations) => {
      const workers = registrations.map((registration) =>
        registration.unregister(),
      );

      Promise.all(workers).catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));

  generateFeed
    .invoke(3)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}, 1500);
