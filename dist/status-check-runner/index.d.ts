export declare const statusCheck: (context: string, command: string) => Promise<{
    command: string;
    context: string;
    status: "success" | "failure";
    stderr: string;
    stdout: string;
}>;
//# sourceMappingURL=index.d.ts.map