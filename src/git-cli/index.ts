import child_process from 'child_process';

import { resolvedSourceVersion } from '../runtime-options/env-vars';

export const getDefaultCommitHash = (): string => {
  let gitHead = '';

  if (resolvedSourceVersion) {
    return resolvedSourceVersion;
  }

  // Ignore STDERR; git write hints to STDERR while exiting on 0
  const execSyncOpts: child_process.ExecSyncOptions = {
    encoding: 'utf8',
    stdio: ['inherit', 'pipe', 'ignore'],
  };

  try {
    gitHead = child_process
      .execSync('git rev-parse HEAD', execSyncOpts)
      .toString()
      .trim();
  } catch (error) {
    // console.warn('No git repo found');
  }

  return gitHead;
};
