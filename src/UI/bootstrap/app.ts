import '../styles/index.scss';
import pageManager from '../pages/PageManager';
import initProviders from './providers';
import themeToggler from '../components/theme/toggler';
import { resolvePath } from '../config/build';

initProviders();

themeToggler.register();

navigator.serviceWorker.register(resolvePath('sw.js'))
  .then((registration) => {
    registration.active?.postMessage({ action: 'generateFeed' });
  })
  .catch(console.error);

// navigator.serviceWorker.addEventListener('message', (event) => {
//   log(`The service worker sent me a message: ${event.data}`);
// });

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(`[to]`).forEach((element) => {
    element.addEventListener('click', () => {
      pageManager.render(element.getAttribute('to') as string);
    });
  });

  pageManager.render('home');
});
