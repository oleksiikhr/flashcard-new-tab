export type CardStatisticsRaw = {
  views: number;
};

export default class CardStatistics {
  private views: number;

  constructor(obj: { views: number | undefined }) {
    this.views = obj.views || 0;
  }

  public increaseViews(value = 1): void {
    this.views += value;
  }

  public serialize(): CardStatisticsRaw {
    return {
      views: this.views,
    };
  }
}
