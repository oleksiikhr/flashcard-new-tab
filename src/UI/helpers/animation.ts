export function numberCounter(
  element: HTMLElement,
  needValue: number,
  speed = 100,
) {
  const animate = () => {
    const value = +element.innerText;
    const time = needValue / speed;

    if (value < needValue) {
      // eslint-disable-next-line no-param-reassign
      element.innerText = Math.ceil(value + time).toString();
      setTimeout(animate, 1);
    } else {
      // eslint-disable-next-line no-param-reassign
      element.innerText = needValue.toString();
    }
  };

  animate();
}

export default {
  numberCounter,
};
