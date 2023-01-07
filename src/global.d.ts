declare namespace JSX {
  // The return type of our JSX Factory: this could be anything
  type Element = HTMLElement;

  // IntrinsicElementMap grabs all the standard HTML tags in the TS DOM lib.
  type IntrinsicElements = IntrinsicElementMap;

  // The following are custom types, not part of TS's known JSX namespace:
  type IntrinsicElementMap = {
    [K in keyof HTMLElementTagNameMap]: {
      [k: string]: unknown;
    };
  };

  interface Component {
    (properties?: { [key: string]: unknown }, children?: Node[]): Node;
  }
}
