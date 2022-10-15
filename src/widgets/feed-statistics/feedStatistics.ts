import { h } from '../../shared/util/dom';
import './feedStatistics.scss';

export default (position: number, count: number) => {
  const element = document.querySelector(
    '[component="feed-statistics"]',
  ) as HTMLElement;

  element.innerText = '';

  element.append(
    h(
      'div',
      {
        class: 'feed-statistics__position',
      },
      position.toString(),
    ),
    h(
      'div',
      {
        class: 'feed-statistics__count',
      },
      `/${count.toString()}`,
    ),
  );
};
