/* eslint-disable */

const esbuild = require('esbuild');
const options = require('./common');

esbuild
  .build({
    ...options,
    sourcemap: true,
    minify: true,
  })
  .then(() => console.log('⚡ Done'))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
