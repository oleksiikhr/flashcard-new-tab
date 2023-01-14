import { version } from '../../../package.json';
import { renderCardBlock } from '../../widgets/card/cardBlock';
import './styles/index.scss';
import feedStatistics from '../../widgets/feedStatistics/feedStatistics';
import { innerText, renderComponent } from '../../shared/util/dom';
import { nextFeedCard } from '../../entities/card/model/actions/nextFeedCard';

export const renderHomePage = () => {
  innerText('.package-version-button', version);

  nextFeedCard()
    .then((card) => {
      if (card !== null) {
        renderCardBlock(card);
        renderComponent('feed-statistics', feedStatistics(89, 100));
      }
    })
    .catch(console.error)
    .finally(() => {
      document.body.removeAttribute('style');
    });
};
