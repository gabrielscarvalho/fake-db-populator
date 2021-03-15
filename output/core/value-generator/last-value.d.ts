import { iColumn, iValueGenerator } from '../../interfaces';
interface LastValueConfig {
    throwErrorIfNotExists: boolean;
}
export declare const LastValue: (column: iColumn, defaultValue?: any, config?: LastValueConfig) => iValueGenerator;
export {};
