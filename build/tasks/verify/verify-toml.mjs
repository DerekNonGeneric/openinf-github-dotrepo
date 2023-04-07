import { execute } from '@yarnpkg/shell';

import { echoTaskRunning } from '../util.mjs';

echoTaskRunning('verify.toml', import.meta.url);

let exitCode = 0;
const scripts = [
  'eslint --ext=.toml', // validate & style-check
];

for await (const element of scripts) {
  try {
    exitCode = await execute(element);
  } catch (p) {
    exitCode = p.exitCode;
  }
  process.exitCode = exitCode > 0 ? exitCode : 0;
}
