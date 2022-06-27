/* eslint-disable */

const path = require('path');
const { sassPlugin } = require('esbuild-sass-plugin');

module.exports = {
  entryPoints: [
    path.resolve(__dirname, '../bootstrap/app.ts'),
    path.resolve(__dirname, '../bootstrap/sw.ts'),
  ],
  outdir: path.resolve(__dirname, '../public/dist'),
  loader: { '.html': 'file', '.svg': 'file' },
  bundle: true,
  plugins: [sassPlugin()],
};
