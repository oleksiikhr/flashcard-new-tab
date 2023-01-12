import themeToggler from '../../features/theme-toggler/toggler';
import { renderHomePage } from '../../pages/home/render';
import '../styles/index.scss';

themeToggler.register();

document.addEventListener('DOMContentLoaded', () => {
  renderHomePage();
});

// TODO Delete on next release
setTimeout(() => {
  navigator.serviceWorker
    ?.getRegistrations()
    .then((registrations) => {
      const workers = registrations.map((registration) =>
        registration.unregister(),
      );

      Promise.all(workers).catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
}, 1500);
