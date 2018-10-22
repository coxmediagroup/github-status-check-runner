export namespace ghsc {
  export interface PreGitArgs {
    sha?: string;
  }

  export interface PreGithubArgs {
    owner?: string;
    repository?: string;
    token?: string;
  }

  export interface GitArgs {
    sha: string;
  }

  export interface GithubArgs {
    owner: string;
    repository: string;
    token: string;
  }

  export interface PreOtherArgs {
    dryrun?: boolean;
  }

  export interface OtherArgs {
    dryrun: boolean;
  }

  export interface StatusCheckArgs {
    [key: string]: string;
  }

  export interface PreValidatedArgs {
    git?: PreGitArgs;
    github?: PreGithubArgs;
    statusChecks?: StatusCheckArgs;
    other?: PreOtherArgs;
  }

  export interface NormalizedArgs {
    git: GitArgs;
    github: GithubArgs;
    statusChecks: StatusCheckArgs;
    other: OtherArgs;
  }

  export type NormalizedArgsKeys = keyof NormalizedArgs;

  export type StatusCheckStates = 'error' | 'failure' | 'pending' | 'success';
  export type StatusCheckStatesSkip = StatusCheckStates | 'skipped';

  export interface NormalizedGitHubReposCreateStatusResponse {
    status: string;
    description: string;
    context: StatusCheckStatesSkip;
    created_at: Date;
    updated_at: Date;
  }

  export interface StatusCheckUpdateResult {
    command?: string;
    context?: string;
    status: StatusCheckStatesSkip;
    stderr?: string;
    stdout?: string;
  }

  export interface YargArgs {
    _: string[];
    $0: string;
    branch?: string;
    commit?: string;
    hash?: string;
    s?: string;
    sha?: string;
    t?: string;
    tag?: string;
    token?: string;
  }
}

export default ghsc;
