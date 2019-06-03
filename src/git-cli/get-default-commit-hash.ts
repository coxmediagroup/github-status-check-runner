import child_process from 'child_process';

import { execSyncOpts } from './const';

export const getDefaultCommitHash = (): string => {
  try {
    return child_process
      .execSync('git rev-parse HEAD', execSyncOpts)
      .toString()
      .trim();
  } catch (error) {
    console.warn('No git repo found');
  }

  return '';
};
