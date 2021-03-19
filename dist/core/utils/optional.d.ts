export declare class Optional<T> {
    protected data: T;
    protected hasChecked: boolean;
    constructor(value?: T);
    static fromNull<T>(): Optional<T>;
    static fromValue<T>(value: T): Optional<T>;
    isPresent(): boolean;
    get(): T;
    /**
     * Skip the isPresent step - but will throw error if value is not present.
     * @return T
    */
    getForced(): T;
}
