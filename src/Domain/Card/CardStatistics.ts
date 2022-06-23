export type CardStatisticsRaw = {
  views: number | undefined;
  clicks: number | undefined;
};

export default class CardStatistics {
  private views: number;

  private clicks: number;

  constructor(obj: CardStatisticsRaw) {
    this.views = obj.views || 0;
    this.clicks = obj.clicks || 0;
  }

  public static createEmpty(): CardStatistics {
    return new CardStatistics({
      views: 0,
      clicks: 0,
    });
  }

  public getViews(): number {
    return this.views;
  }

  public getClicks(): number {
    return this.clicks;
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
