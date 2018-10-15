import { ghsc } from 'types';

import Github from '@octokit/rest';

import runtimeOptions from '../runtime-options';
import { getVersion } from '../utils';

const token = runtimeOptions.github.token;

const defaultStatusParams: Github.ReposCreateStatusParams = {
  context: '',
  description: '',
  owner: runtimeOptions.github.owner,
  repo: runtimeOptions.github.repository,
  sha: runtimeOptions.git.sha,
  state: 'pending',
};

export class ConfiguredGithubAPI {
  private api: Github;

  constructor() {
    this.api = new Github({
      headers: {
        accept: 'application/vnd.github.v3+json',
        'user-agent': `GitHub Status Checks v${ getVersion() }`,
      },
    });
    if (token) {
      this.api.authenticate({ type: 'token', token });
    }
  }

  public async setGithubStatus(context: string, state: ghsc.StatusCheckStates = 'pending', description: string = '' ): Promise<ghsc.statusCheckUpdateResult> {
    const statusParams = { ...defaultStatusParams, ...{ context, state } };

    if (description) {
      statusParams.description = description;
    }

    if (runtimeOptions.other.dryrun) {
      return Promise.resolve({ status: status } as ghsc.statusCheckUpdateResult);
    }

    return this.api.repos.createStatus(statusParams)
      .then(response => ({ status: response.data.state } as ghsc.statusCheckUpdateResult));
  }
}
