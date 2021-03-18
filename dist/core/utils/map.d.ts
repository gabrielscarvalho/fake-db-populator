import { iMap } from '../../interfaces';
import { Optional } from './optional';
export declare class NamedMap<T> implements iMap<T> {
    private data;
    constructor();
    has(name: string): boolean;
    add(name: string, content: T, config?: {
        throwIfExists: boolean;
    }): iMap<T>;
    get(name: string, config?: {
        throwIfNotExists: boolean;
    }): Optional<T>;
    delete(name: string, config?: {
        throwIfNotExists: boolean;
    }): boolean;
    getKeys(): string[];
    forEachEntry(callback: (key: string, value: T) => void): void;
    getValues(): T[];
    find(filter: any): Optional<T>;
}
