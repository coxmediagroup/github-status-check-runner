export declare const runtimeOptionsConstraints: {
    other: {
        presence: boolean;
    };
    'other.dryrun': {
        presence: boolean;
    };
    runCheck: {
        presence: boolean;
    };
    'runCheck.command': {
        presence: boolean;
    };
    'runCheck.context': {
        presence: boolean;
    };
    github: {
        presence: boolean;
    };
    'github.owner': {
        presence: boolean;
        format: {
            pattern: RegExp;
            message: string;
        };
    };
    'github.repository': {
        presence: boolean;
        format: {
            pattern: RegExp;
            message: string;
        };
    };
    'github.token': {
        presence: boolean;
        format: {
            pattern: RegExp;
            message: string;
        };
    };
    git: {
        presence: boolean;
    };
    'git.sha': {
        presence: boolean;
        format: {
            pattern: RegExp;
            message: string;
        };
    };
};
//# sourceMappingURL=validation-constraints.d.ts.map