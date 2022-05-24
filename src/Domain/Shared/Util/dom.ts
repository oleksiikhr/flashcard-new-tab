export function h(
  type: string,
  props: { [key: string]: string | EventListenerOrEventListenerObject } = {}
) {
  const element = document.createElement(type);

  Object.entries(props).forEach(([key, val]) => {
    if ('string' === typeof val) {
      element.setAttribute(key, val);
    } else {
      element.addEventListener(key, val);
    }
  });

  return element;
}

export function styles(data: {
  [key: string]: { [key: string]: string };
}): string {
  let css = '';

  Object.entries(data).forEach(([selector, properties]) => {
    css += `${selector}{`;

    Object.entries(properties).forEach(([k, v]) => {
      css += `${k}: ${v};`;
    });

    css += '}';
  });

  return css;
}

export default {
  h,
  styles,
};
