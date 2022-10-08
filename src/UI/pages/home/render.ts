import { version } from '../../../../package.json';
import { findRandomFeed } from '../../../Application/Feed/FindRandomFeed';
import feedStatistics from './feedStatistics/feedStatistics';
import card from './card/card';
import './styles/index.scss';

const renderHomePage = () => {
  (
    document.body.querySelector('.package-version') as HTMLDivElement
  ).innerText = `Version ${version}`;

  findRandomFeed
    .invoke()
    .then((feed) => {
      if (undefined !== feed) {
        feedStatistics(feed.getPosition(), feed.getCount());
        card(feed.getCard(), feed.getDeck(), feed.getTags());
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      document.body.style.display = '';
    });
};

export { renderHomePage };
