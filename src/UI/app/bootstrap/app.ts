import '../styles/index.scss';
import pageManager from '../../pages/PageManager';
import themeToggler from '../../components/theme/toggler';
import { generateFeed } from '../../../Application/Feed/GenerateFeed';

themeToggler.register();

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(`[to]`).forEach((element) => {
    element.addEventListener('click', () => {
      pageManager.render(element.getAttribute('to') as string);
    });
  });

  pageManager.render('home');
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
}, 1000);
