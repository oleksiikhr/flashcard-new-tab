/* eslint-disable */

const esbuild = require('esbuild');
const options = require('./common');

esbuild
  .build({
    ...options,
    watch: {
      onRebuild(error) {
        if (null === error) {
          console.log('⚡ Rebuild');
        }
      },
    },
  })
  .then(() => console.log('⚡ Done'))
  .catch((err) => console.error(err));
