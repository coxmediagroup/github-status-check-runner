import { ghsc } from 'types';
export declare class ConfiguredGithubAPI {
    private api;
    constructor();
    setGithubStatus(context: string, state?: ghsc.StatusCheckState, description?: string): Promise<ghsc.StatusCheckUpdateResult>;
}
//# sourceMappingURL=class.d.ts.map