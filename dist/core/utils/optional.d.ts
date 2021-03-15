export declare class Optional<T> {
    protected data: T;
    protected hasChecked: boolean;
    constructor(value?: T);
    set(value: T): void;
    static fromNullable<T>(): Optional<T>;
    static fromValue<T>(value: T): Optional<T>;
    isPresent(): boolean;
    get(config?: {
        skipValidation: boolean;
    }): T;
}
