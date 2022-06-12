export type CardStatisticsRaw = {
  views: number;
  clicks: number;
  notifications: number;
};

export default class CardStatistics {
  private views: number;

  private clicks: number;

  private notifications: number;

  constructor(obj: {
    views?: number;
    clicks?: number;
    notifications?: number;
  }) {
    this.views = obj.views || 0;
    this.clicks = obj.clicks || 0;
    this.notifications = obj.notifications || 0;
  }

  public static createEmpty(): CardStatistics {
    return new CardStatistics({
      views: 0,
      clicks: 0,
      notifications: 0,
    });
  }

  public increaseViews(value = 1): void {
    this.views += value;
  }

  public increaseClicks(value = 1): void {
    this.clicks += value;
  }

  public increaseNotifications(value = 1): void {
    this.notifications += value;
  }

  public serialize(): CardStatisticsRaw {
    return {
      views: this.views,
      clicks: this.clicks,
      notifications: this.notifications,
    };
  }
}
