import { ghsc } from 'types';

import child_process from 'child_process';
import { promisify, CustomPromisify } from 'util';

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
  let status: ghsc.StatusCheckStates = 'success';
  let stderr: string;
  let stdout: string;

  return configuredGithubAPI
    .setGithubStatus(context)
    .then(() => {
      return execPromise(command)
        .catch((execResults) => {
          status = 'failure';
          return execResults;
        })
        .then((execResults) => {
          stderr = execResults.stderr;
          stdout = execResults.stdout;
          return execResults;
        });
    })
    .then(() =>
      configuredGithubAPI.setGithubStatus(
        context,
        status,
        status !== 'success' ? stderr : stdout,
      ),
    )
    .then(() => ({ command, context, status, stderr, stdout }));
};

export const allStatusChecks = async (contextCommands: string[][]) => {
  return Promise.all(
    contextCommands.map(([context, command]) => statusCheck(context, command)),
  );
};
