/* eslint-disable no-console, import/no-commonjs, functional/no-try-statement, functional/immutable-data*/

const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');
const execa = require('execa');

(async function run() {
  await fs.remove('./dist');

  await execa(`rollup`, ['-c'], { stdio: 'inherit' });

  console.log();
  console.log(chalk.bold(chalk.yellow(`Rolling up type definitions for dd...`)));

  const { Extractor, ExtractorConfig } = require('@microsoft/api-extractor');

  const extractorConfigPath = path.resolve('./', 'api-extractor.json');

  const extractorConfig = ExtractorConfig.loadFileAndPrepare(extractorConfigPath);
  const result = Extractor.invoke(extractorConfig, {
    localBuild: true,
    showVerboseMessages: true,
  });

  if (result.succeeded) {
    console.log(chalk.bold(chalk.green(`API Extractor completed successfully.`)));
  } else {
    console.error(
      `API Extractor completed with ${result.errorCount} errors` +
        ` and ${result.warningCount} warnings`
    );

    process.exitCode = 1;
  }

  await fs.remove('./dist/src');

  console.log();
})();
