import { version } from '../../../package.json';
import feedStatistics from '../../widgets/feed-statistics/feedStatistics';
import card from './card/card';
import './styles/index.scss';
import { findRandomFeedRequest } from '../../entities/feed/database/requests/findRandomFeedRequest';
import { updateCardRequest } from '../../entities/card/database/requests/updateCardRequest';

const renderHomePage = () => {
  (
    document.body.querySelector('.package-version') as HTMLDivElement
  ).innerText = `Version ${version}`;

  findRandomFeedRequest()
    .then((feed) => {
      if (undefined !== feed) {
        feed.getCard().updateLastSeen();
        updateCardRequest(feed.getCard()).catch(console.error);

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
