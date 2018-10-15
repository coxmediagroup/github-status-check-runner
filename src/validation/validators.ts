import validate from 'validate.js';

import ghsc from '../types';

import { runtimeOptionsConstraints } from './constraints';

export const validateRuntimeOptions = (options: ghsc.PreValidatedArgs): Promise<ghsc.NormalizedArgs> => {

  return new Promise((resolve, reject) => {
    const results = validate(options, runtimeOptionsConstraints);

    if (results) {
      reject(new Error(JSON.stringify(results, null, 2)));
    }

    resolve(options as ghsc.NormalizedArgs);
  });
};
