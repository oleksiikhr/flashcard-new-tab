import { version } from '../../../package.json';
import feedStatistics from '../../widgets/feed-statistics/feedStatistics';
import card from './card/card';
import './styles/index.scss';
import { findRandomFeedRequest } from '../../entities/feed/database/requests/findRandomFeedRequest';
import { updateCardRequest } from '../../entities/card/database/requests/updateCardRequest';
import { updateLastSeenCard } from '../../entities/card/model/card';

const renderHomePage = () => {
  (
    document.body.querySelector('.package-version') as HTMLDivElement
  ).innerText = `v${version}`;

  findRandomFeedRequest()
    .then((feed) => {
      if (undefined !== feed) {
        updateLastSeenCard(feed.card);
        updateCardRequest(feed.card).catch(console.error);
        feedStatistics(feed.position, feed.count);
        card(feed.card, feed.deck, feed.tags);
      }
    })
    .catch((err) => console.error(err))
    .finally(() => {
      document.body.style.display = '';
    });
};

export { renderHomePage };
