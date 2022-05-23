export default interface Page {
  onFirstMount(): void;

  mount(): void;

  destroy(): void;
}
