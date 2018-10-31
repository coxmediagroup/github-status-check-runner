import validateJs from 'validate.js';

import { ghsc } from '../types';
import { checkCleanStage } from '../git-cli';
import { runtimeOptionsConstraints } from './validation-constraints';

export const validateRuntimeOptions = async (
  options: ghsc.PreValidatedArgs,
): Promise<ghsc.NormalizedArgs> => {
  const issues = validateJs(options, runtimeOptionsConstraints);
  if (issues) {
    throw new Error(JSON.stringify(issues, null, 2));
  }
  return options as ghsc.NormalizedArgs;
};

export const validateCleanStage = async (): Promise<void> => {
  const complaints = checkCleanStage().filter((value) => value);
  if (complaints.length) {
    throw new Error(complaints.join('\n'));
  }
};
