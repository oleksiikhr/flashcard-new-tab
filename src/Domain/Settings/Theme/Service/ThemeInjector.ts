import Theme from '../Theme';
import { h, styles } from '../../../Shared/Util/dom';

export default class ThemeInjector {
  public inject(selectorId: string, theme: Theme) {
    let element = document.head.querySelector(`#${selectorId}`);

    if (null === element) {
      element = h('style', { id: selectorId });

      document.head.append(element);
    }

    // TODO Theme apply
    element.textContent = styles({
      body: {
        background: 'black',
        color: 'white',
      },
    });
  }
}
