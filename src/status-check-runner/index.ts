import { ghsc } from 'types';

import child_process from 'child_process';
import { promisify } from 'util';

import { configuredGithubAPI } from '../github-api';

const execPromise = promisify(child_process.exec);

/**
 * Creates, or updates, a GitHub status-check, labeled `context`, sets the status of it to 'pending'
 * Executes the shell command:
 *   Determine `status` based on the results of the shell command:
 *     * 'success' (command exits on 0)
 *     * 'failure' (command exits on any non-zero)
 * Set the status of the same GitHub status-check, labeled `context`, to the value of `status`
 * Finally returning the results of the shell command
 *
 * @param context: string
 * @param command: string
 * @returns: Promise
 */
export const statusCheck = async (context: string, command: string) => {
  let status: ghsc.StatusCheckState = 'success';
  let execResults = { stdout: '', stderr: '' };

  // Check starts off in a pending state
  await configuredGithubAPI.setGithubStatus(context);

  // Execute the check command
  try {
    execResults = await execPromise(command);
  } catch (execResults) {
    status = 'failure';
  }

  // Update the status check with the results of the check command
  await configuredGithubAPI.setGithubStatus(context, status);

  // Return a payload for use downstream
  return {
    command,
    context,
    status,
    stderr: execResults.stderr,
    stdout: execResults.stdout,
  };
};
