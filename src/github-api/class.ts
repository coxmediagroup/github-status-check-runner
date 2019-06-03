import { StatusCheckState, StatusCheckUpdateResult } from 'types';

import rest from '@octokit/rest';

import runtimeOptions from '../runtime-options';
import { getVersion } from '../utils';

const token = runtimeOptions.github.token;

const defaultStatusParams: rest.ReposCreateStatusParams = {
  context: '',
  description: '',
  owner: runtimeOptions.github.owner,
  repo: runtimeOptions.github.repository,
  sha: runtimeOptions.git.sha,
  state: 'pending',
};

export class ConfiguredGithubAPI {
  private api: rest;

  constructor() {
    this.api = new rest({
      headers: {
        accept: 'application/vnd.github.v3+json',
        'user-agent': `GitHub Status Checks v${getVersion()}`,
      },
    });
    if (token) {
      this.api.authenticate({ token, type: 'token' });
    }
  }

  public async setGithubStatus(
    context: string,
    state: StatusCheckState = 'pending',
    description: string = '',
  ): Promise<StatusCheckUpdateResult> {
    const statusParams = { ...defaultStatusParams, ...{ context, state } };

    if (description) {
      statusParams.description = description;
    }

    if (runtimeOptions.other.dryrun) {
      return {
        context,
        status: 'skipped',
      } as StatusCheckUpdateResult;
    }

    const { data } = await this.api.repos.createStatus(statusParams);
    return { status: data.state } as StatusCheckUpdateResult;
  }
}
