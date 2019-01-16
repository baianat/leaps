const path = require('path');
const resolve = require('rollup-plugin-node-resolve');
const babel = require('rollup-plugin-babel');
const replace = require('rollup-plugin-replace');
const vue = require('rollup-plugin-vue');
const version = process.env.VERSION || require('../package.json').version;

const paths = {
  src: path.join(__dirname, '../src'),
  dist: path.join(__dirname, '../dist')
}
const builds = {
  input: {
    input: path.join(paths.src, 'index.js'),
    plugins: [
      replace({ __VERSION__: version }),
      vue(),
      babel(),
      resolve()
    ]
  },
  output: {
    name: 'leaps',
    exports: 'named',
    banner:
      `/**
    * Leaps ${version}
    * (c) ${new Date().getFullYear()}
      * @license MIT
      */`,
      outputFolder: path.join(__dirname, '../dist'),
  }
};

const uglifyOptions = {
  toplevel: true,
  compress: true,
  mangle: true
}

module.exports = {
  paths,
  builds,
  uglifyOptions
};