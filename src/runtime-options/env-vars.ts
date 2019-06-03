import { PreValidatedArgs } from '../types';

import { baseArgs } from '.';
import { trimArgs } from '../utils';

// GitHub API variables
const githubOwner: string = process.env.GITHUB_OWNER || '';
const githubRepo: string = process.env.GITHUB_REPO || '';
const githubToken: string = process.env.GITHUB_TOKEN || '';

const args = (): PreValidatedArgs => {
  const newArgs = baseArgs();

  // GitHub
  newArgs.github.owner = githubOwner;
  newArgs.github.repository = githubRepo;
  newArgs.github.token = githubToken;

  // Remove properties with empty values
  trimArgs(newArgs);

  return newArgs;
};

export default args;
