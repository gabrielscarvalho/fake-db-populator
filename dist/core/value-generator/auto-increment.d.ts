export declare class AutoIncrement {
    private ids;
    constructor();
    initialId(uniqueName: string, initialValue: number): AutoIncrement;
    valueGen(uniqueName: string, incrementBy?: number): () => number;
}
