import themeToggler from '../../features/theme-toggler/toggler';
import { renderHomePage } from '../../pages/home/render';
import '../styles/index.scss';
import { generateFeed } from '../../entities/feed/useCases/generateFeed';

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

  generateFeed(3)
    .then((res) => console.log(res))
    .catch((err) => console.error(err));
}, 1500);
