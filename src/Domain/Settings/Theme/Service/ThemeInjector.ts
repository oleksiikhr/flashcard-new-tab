import Theme from '../Theme';
import { h, styles } from '../../../Shared/Util/dom';

export default class ThemeInjector {
  public inject(selectorId: string, theme: Theme) {
    const element = ThemeInjector.makeElement(selectorId);

    // TODO Theme apply
    element.textContent = styles({
      body: {
        background: 'black',
        color: 'white',
        something: theme.getType().getValue().toString(),
      },
    });
  }

  private static makeElement(selectorId: string): HTMLElement {
    let element = document.head.querySelector(`#${selectorId}`);

    if (null === element) {
      element = h('style', { id: selectorId });

      document.head.append(element);
    }

    return element as HTMLElement;
  }
}
