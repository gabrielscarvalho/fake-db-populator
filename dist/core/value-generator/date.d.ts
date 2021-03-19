import { iValueGenerator } from '../../interfaces';
interface DateRange {
    year: {
        min: number;
        max: number;
    };
    month: {
        min: number;
        max: number;
    };
    day: {
        min: number;
        max: number;
    };
    hour: {
        min: number;
        max: number;
    };
    minute: {
        min: number;
        max: number;
    };
    second: {
        min: number;
        max: number;
    };
}
export declare class DateGen {
    static getDefaultDateRange(): DateRange;
    static between(range?: Partial<DateRange>): iValueGenerator;
    /**
     * Returns a random date
     * @see docs https://chancejs.com/text/date.html
     */
    static Random(): iValueGenerator;
}
export {};
