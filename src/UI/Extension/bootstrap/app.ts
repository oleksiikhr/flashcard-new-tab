const asd = '1432';

const gre = (async (): Promise<any> =>
  new Promise((resolve) => {
    resolve('good');
  })
    .then((res) => console.log('then', res))
    .catch((res) => console.log('catch', res)))();

console.log(gre);
