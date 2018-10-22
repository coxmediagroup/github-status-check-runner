import runtimeOptions from './runtime-options';

import { allStatusChecks } from './status-check-runner';
import { validateRuntimeOptions } from './validation';

export const main = (): void => {
  validateRuntimeOptions(runtimeOptions)
    .then((validatedOptions) => Object.entries(validatedOptions.statusChecks))
    .then((statusChecks) => allStatusChecks(statusChecks))
    .then((statusCheckSummary) =>
      console.log(JSON.stringify(statusCheckSummary, null, 2)),
    )
    .catch((error) => {
      console.error(error.message);
      process.exit(1);
    });
};
