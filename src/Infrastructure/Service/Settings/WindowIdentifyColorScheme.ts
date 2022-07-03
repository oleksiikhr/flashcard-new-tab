import IdentifyColorScheme from '../../../Domain/Settings/Service/IdentifyColorScheme';

export default class WindowIdentifyColorScheme implements IdentifyColorScheme {
  isDark(): boolean {
    return window.matchMedia('(prefers-color-scheme:dark)').matches;
  }
}
