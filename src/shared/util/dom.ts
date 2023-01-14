export function h(
  type: string,
  props: {
    [key: string]: string | EventListenerOrEventListenerObject;
  } | null = null,
  ...children: (Node | string)[]
): HTMLElement {
  const element = document.createElement(type);

  if (props !== null) {
    Object.entries(props).forEach(([key, val]) => {
      if (typeof val === 'string') {
        element.setAttribute(key, val);
      } else {
        element.addEventListener(key, val);
      }
    });
  }

  children.forEach((child) => {
    element.append(child);
  });

  return element;
}

export const renderComponent = (name: string, content: HTMLElement): void => {
  const element = document.body.querySelector(
    `[component="${name}"]`,
  ) as HTMLElement;

  element.replaceChildren(content);
};

export const innerText = (selector: string, text: string | number) => {
  const element = document.querySelector(selector) as HTMLElement;

  element.innerText = typeof text === 'number' ? text.toString() : text;
};
