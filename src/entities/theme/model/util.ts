export function isDarkMedia() {
  return window.matchMedia('(prefers-color-scheme:dark)').matches;
}
