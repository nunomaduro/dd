/* eslint-disable import/no-commonjs, functional/immutable-data, functional/no-let, no-param-reassign */

import json from '@rollup/plugin-json';
import path from 'path';
import ignore from 'rollup-plugin-ignore';
import globals from 'rollup-plugin-node-globals';
import ts from 'rollup-plugin-typescript2';

const builds = [
  { file: `dd.esm.js`, format: `es` },
  { file: `dd.cjs.js`, format: `cjs` },
];

export default builds.map(build => {
  const output = build;

  output.file = `dist/${output.file}`;

  const dependencies = require('./package.json').dependencies;

  return {
    input: 'src/index.ts',
    external: dependencies,
    plugins: [
      json({ namedExports: false }),
      globals({ global: true }),
      ignore([]), // external dependencies to ignore, if any.
      ts({
        check: true,
        tsconfig: path.resolve(__dirname, 'tsconfig.json'),
        cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
        tsconfigOverride: {
          include: ['src/**/*.ts'],
          exclude: ['tests/**'],
          compilerOptions: {
            declaration: true,
            declarationMap: true,
          },
        },
      }),
    ],
    output,
    onwarn(msg, warn) {
      if (!/Circular/.test(msg)) {
        warn(msg);
      }
    },
  };
});
