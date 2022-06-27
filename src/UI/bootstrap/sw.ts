import { generateFeed } from './bus';
import initProviders from './providers';

initProviders();

type Asd = {
  action: 'generateFeed';
};

// eslint-disable-next-line no-restricted-globals
addEventListener('message', (event) => {
  let data: Asd;

  try {
    data = JSON.parse(event.data as string) as Asd;
  } catch (err) {
    return;
  }

  if ('generateFeed' === data.action) {
    generateFeed(10);
  }

  // event.source.postMessage("Hi client");
});
