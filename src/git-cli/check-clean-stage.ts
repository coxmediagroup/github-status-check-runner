import child_process from 'child_process';

import { execSyncOpts } from './const';

export const checkCleanStage = () => {
  const status = child_process
    .execSync('git status --porcelain', execSyncOpts)
    .toString()
    .trim()
    .split('\n');

  return status;
};
