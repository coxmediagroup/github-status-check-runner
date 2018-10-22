import { ghsc } from '../types';

import { baseArgs } from '.';
import { trimArgs } from '../utils';

// GitHub API variables
const githubOwner: string = process.env.GITHUB_OWNER || '';
const githubRepo: string = process.env.GITHUB_REPO || '';
const githubToken: string = process.env.GITHUB_TOKEN || '';

// Build-step optimization
export const resolvedSourceVersion: string =
  process.env.CODEBUILD_RESOLVED_SOURCE_VERSION || '';

const args = (): ghsc.PreValidatedArgs => {
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
