import child_process from 'child_process';

// Ignore STDERR; git write hints to STDERR while exiting on 0
export const execSyncOpts: child_process.ExecSyncOptions = {
  encoding: 'utf8',
  stdio: ['inherit', 'pipe', 'ignore'],
};
