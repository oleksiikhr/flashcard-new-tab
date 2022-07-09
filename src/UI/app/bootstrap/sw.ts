import initProviders from '../providers/transactionPipeline';
import {
  ServiceWorkerRequest,
  ServiceWorkerResponse,
} from '../../helper/serviceWorker';
import generateFeed from '../bus/feed/generateFeed';

initProviders();

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (event) => {
  const data = event.data as ServiceWorkerRequest;
  let promise;

  switch (data.command.action) {
    case 'generateFeed':
      promise = generateFeed(data.command.limit);
      break;
    default:
      return;
  }

  promise
    .then((response) => {
      const message: ServiceWorkerResponse = {
        result: 'success',
        response,
      };

      event.source?.postMessage(message);
    })
    .catch((err: unknown) => {
      const message: ServiceWorkerResponse = {
        result: 'error',
        response: err,
      };

      event.source?.postMessage(message);
    });
});
