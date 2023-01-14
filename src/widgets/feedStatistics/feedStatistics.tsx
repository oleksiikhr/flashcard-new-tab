import { h } from '../../shared/util/dom';
import './feedStatistics.scss';

export default (now: number, all: number) => (
  <div class="feed-statistics">
    <div class="feed-statistics__now">{now}</div>
    <div class="feed-statistics__all">{all}</div>
  </div>
);
