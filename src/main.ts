import runtimeOptions from './runtime-options';

import { statusCheck } from './status-check-runner';
import { validateCleanStage, validateRuntimeOptions } from './runtime-options/validators';

export const main = async () => {
  try {
    await validateCleanStage();
    const {
      runCheck: { context, command },
    } = await validateRuntimeOptions(runtimeOptions);
    const summary = await statusCheck(context, command);
    console.log(JSON.stringify(summary, null, 2));
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};
