export type CardStatisticsRaw = {
  views: number;
  clicks: number;
};

export default class CardStatistics {
  private views: number;

  private clicks: number;

  constructor(obj: { views?: number; clicks?: number }) {
    this.views = obj.views || 0;
    this.clicks = obj.clicks || 0;
  }

  public static createEmpty(): CardStatistics {
    return new CardStatistics({
      views: 0,
      clicks: 0,
    });
  }

  public increaseViews(value = 1): void {
    this.views += value;
  }

  public increaseClicks(value = 1): void {
    this.clicks += value;
  }

  public serialize(): CardStatisticsRaw {
    return {
      views: this.views,
      clicks: this.clicks,
    };
  }
}
