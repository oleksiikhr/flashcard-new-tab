import { version } from '../../../package.json';
// import feedStatistics from '../../widgets/feed-statistics/feedStatistics';
import card from './card/card';
import './styles/index.scss';
import feedStatistics from "../../widgets/feed-statistics/feedStatistics";
// import { findRandomFeedRequest } from '../../entities/feed/database/repository/findRandomFeedRequest';
// import { updateCardQuery } from '../../entities/card/database/repository/updateCardQuery';
// import { updateLastSeenCard } from '../../entities/card/model/card';

console.log(card)

const renderHomePage = () => {
  (
    document.body.querySelector('.package-version') as HTMLDivElement
  ).innerText = `v${version}`;

  feedStatistics(73, 100);

  // findRandomFeedRequest()
  //   .then((feed) => {
  //     if (undefined !== feed) {
  //       updateLastSeenCard(feed.card);
  //       updateCardQuery(feed.card).catch(console.error);
  //       feedStatistics(feed.position, feed.count);
  //       card(feed.card);
  //     }
  //   })
  //   .catch((err) => console.error(err))
  //   .finally(() => {
      document.body.style.display = '';
    // });
};

export { renderHomePage };
