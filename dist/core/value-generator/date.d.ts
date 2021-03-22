import { iValueGenerator } from '../../interfaces';
interface DateRange {
    year: number | {
        min: number;
        max: number;
    };
    month: number | {
        min: number;
        max: number;
    };
    day: number | {
        min: number;
        max: number;
    };
    hour: number | {
        min: number;
        max: number;
    };
    minute: number | {
        min: number;
        max: number;
    };
    second: number | {
        min: number;
        max: number;
    };
    ms: number | {
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
