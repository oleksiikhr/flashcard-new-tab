import '../styles/index.scss';
import pageManager from '../pages/PageManager';
import initProviders from './providers';
import themeToggler from '../components/theme/toggler';
import { resolvePath } from '../config/build';
import {
  ServiceWorkerRequest,
  ServiceWorkerResponse,
} from '../helpers/serviceWorker';
import logger from '../helpers/logger';

initProviders();

themeToggler.register();

navigator.serviceWorker
  .register(resolvePath('sw.js'))
  .then((registration) => {
    const data: ServiceWorkerRequest = {
      command: {
        action: 'generateFeed',
        limit: 3,
      },
    };

    registration.active?.postMessage(data);
  })
  .catch((err: unknown) =>
    logger.error('App', 'serviceWorker', 'registration', { err }),
  );

navigator.serviceWorker.addEventListener('message', (event) => {
  const data = event.data as ServiceWorkerResponse;

  logger.info('App', 'serviceWorker', 'message', { event, data });
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll(`[to]`).forEach((element) => {
    element.addEventListener('click', () => {
      pageManager.render(element.getAttribute('to') as string);
    });
  });

  pageManager.render('home');
});
