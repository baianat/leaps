const fs = require('fs');
const filesize = require('filesize');
const gzipSize = require('gzip-size');
const path = require('path');
const chalk = require('chalk');
const mkdirpNode = require('mkdirp');
const { rollup } = require('rollup');
const { promisify } = require('util');
const { builds, paths } = require('./config');

const mkdirp = promisify(mkdirpNode);

build();

async function build () {
  await mkdirp(paths.dist);
  console.log(chalk.cyan('Generating esm build...'));

  let bundle = await rollup(builds.input);
  let { code } = await bundle.generate(builds.output);
  let outputPath = path.join(paths.dist, 'vector.js');
  fs.writeFile(outputPath, code, (err) => {
    if (err) {
      throw err;
    }
    let stats = getStats({ code, path: outputPath });
    console.log(`${chalk.green('Output File:')} vector ${stats}`);
  });
}

function getStats ({ path, code }) {
  const { size } = fs.statSync(path);
  const gzipped = gzipSize.sync(code);

  return `| Size: ${filesize(size)} | Gzip: ${filesize(gzipped)}`;
}

module.exports = {
  build
};