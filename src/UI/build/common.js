/* eslint-disable */

const path = require('path');
const { sassPlugin } = require('esbuild-sass-plugin');

module.exports = {
  entryPoints: [
    path.resolve(__dirname, '../bootstrap/home.ts'),
    path.resolve(__dirname, '../bootstrap/settings.ts'),
  ],
  outdir: path.resolve(__dirname, '../public/dist'),
  bundle: true,
  plugins: [sassPlugin()],
};
