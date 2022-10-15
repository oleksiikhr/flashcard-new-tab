import { h } from './dom';

describe('h', () => {
  test('Creates an empty div element', () => {
    const element = h('div');

    expect(element.outerHTML).toBe('<div></div>');
  });

  test('Creates a div element with some attributes', () => {
    const element = h('div', {
      class: 'text-center',
      'aria-label': 'menu',
    });

    expect(element.outerHTML).toBe(
      '<div class="text-center" aria-label="menu"></div>',
    );
  });

  test('Creates a span element with text', () => {
    const element = h('span', undefined, 'Click on me!');

    expect(element.outerHTML).toBe('<span>Click on me!</span>');
  });

  test('Creates a p element with array of texts', () => {
    const element = h(
      'p',
      undefined,
      'Paragraph 1',
      'Paragraph 2',
      'Paragraph 3',
    );

    expect(element.outerHTML).toBe('<p>Paragraph 1Paragraph 2Paragraph 3</p>');
  });

  test('Creates a div element with nodes', () => {
    const element = h(
      'div',
      {
        class: 'text-left',
      },
      h('p', undefined, 'Inside paragraph'),
    );

    expect(element.outerHTML).toBe(
      '<div class="text-left"><p>Inside paragraph</p></div>',
    );
  });

  test('Creates a div element with register a click event', () => {
    const onClick = jest.fn();
    const element = h('div', { click: onClick });
    element.click();

    expect(onClick.mock.calls.length).toBe(1);
  });
});
