import child_process from 'child_process';

// Ignore STDERR; git write hints to STDERR while exiting on 0
const execSyncOpts: child_process.ExecSyncOptions = {
  encoding: 'utf8',
  stdio: ['inherit', 'pipe', 'ignore'],
};

export const checkCleanStage = () => {
  const status = child_process
    .execSync('git status --porcelain', execSyncOpts)
    .toString()
    .trim()
    .split('\n');
  return status;
};

export const getDefaultCommitHash = (): string => {
  let gitHead = '';

  try {
    gitHead = child_process
      .execSync('git rev-parse HEAD', execSyncOpts)
      .toString()
      .trim();
  } catch (error) {
    console.warn('No git repo found');
  }

  return gitHead;
};
