import initProviders from './providers';
// import {
//   ServiceWorkerRequest,
//   ServiceWorkerResponse,
// } from '../helpers/serviceWorker';
// import { generateFeed } from './bus';

initProviders();

// eslint-disable-next-line no-restricted-globals
// addEventListener('message', (event) => {
//   const data = event.data as ServiceWorkerRequest;
//   let promise;
//
//   switch (data.command.action) {
//     case 'generateFeed':
//       promise = generateFeed(data.command.limit);
//       break;
//     default:
//       return;
//   }
//
//   promise
//     .then((response) => {
//       const message: ServiceWorkerResponse = {
//         result: 'success',
//         response,
//       };
//
//       event.source?.postMessage(message);
//     })
//     .catch((error) => {
//       const message: ServiceWorkerResponse = {
//         result: 'error',
//         response: error,
//       };
//
//       event.source?.postMessage(message);
//     });
// });
