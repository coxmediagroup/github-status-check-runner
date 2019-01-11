export declare namespace ghsc {
    interface PreGitArgs {
        sha?: string;
    }
    interface PreGithubArgs {
        owner?: string;
        repository?: string;
        token?: string;
    }
    interface GitArgs {
        sha: string;
    }
    interface GithubArgs {
        owner: string;
        repository: string;
        token: string;
    }
    interface PreOtherArgs {
        dryrun?: boolean;
    }
    interface OtherArgs {
        dryrun: boolean;
    }
    interface PreStatusCheckArgs {
        command?: string;
        context?: string;
    }
    interface StatusCheckArgs {
        command: string;
        context: string;
    }
    interface PreValidatedArgs {
        git?: PreGitArgs;
        github?: PreGithubArgs;
        runCheck?: PreStatusCheckArgs;
        other?: PreOtherArgs;
    }
    interface NormalizedArgs {
        git: GitArgs;
        github: GithubArgs;
        runCheck: StatusCheckArgs;
        other: OtherArgs;
    }
    type NormalizedArgsKeys = keyof NormalizedArgs;
    type StatusCheckState = 'error' | 'failure' | 'pending' | 'success';
    type StatusCheckStateSkip = StatusCheckState | 'skipped';
    interface NormalizedGitHubReposCreateStatusResponse {
        status: string;
        description: string;
        context: StatusCheckStateSkip;
        created_at: Date;
        updated_at: Date;
    }
    interface StatusCheckUpdateResult {
        command?: string;
        context?: string;
        status: StatusCheckStateSkip;
        stderr?: string;
        stdout?: string;
    }
    interface YargArgs {
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
//# sourceMappingURL=types.d.ts.map