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

  export interface PreStatusCheckArgs {
    command?: string;
    context?: string;
  }

  export interface StatusCheckArgs {
    command: string;
    context: string;
  }

  export interface PreValidatedArgs {
    git?: PreGitArgs;
    github?: PreGithubArgs;
    runCheck?: PreStatusCheckArgs;
    other?: PreOtherArgs;
  }

  export interface NormalizedArgs {
    git: GitArgs;
    github: GithubArgs;
    runCheck: StatusCheckArgs;
    other: OtherArgs;
  }

  export type NormalizedArgsKeys = keyof NormalizedArgs;

  export type StatusCheckState = 'error' | 'failure' | 'pending' | 'success';
  export type StatusCheckStateSkip = StatusCheckState | 'skipped';

  export interface NormalizedGitHubReposCreateStatusResponse {
    status: string;
    description: string;
    context: StatusCheckStateSkip;
    created_at: Date;
    updated_at: Date;
  }

  export interface StatusCheckUpdateResult {
    command?: string;
    context?: string;
    status: StatusCheckStateSkip;
    stderr?: string;
    stdout?: string;
  }

  export interface YargArgs {
    _: string[];
    $0: string;
    branch?: string;
    c?: string;
    commit?: string;
    context?: string;
    hash?: string;
    s?: string;
    sha?: string;
    t?: string;
    tag?: string;
    token?: string;
  }
}

export default ghsc;
