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
