import { DatabaseReservedWords } from '../database/reserved-words';
import { iParser } from '../../interfaces';
import { NumberParser } from './number.parser';

describe('NumberParser tests', () => {
  const reservedWords = new DatabaseReservedWords();

  it('should have the right type', () => {
    const parser: iParser = new NumberParser(reservedWords);
    expect(parser.type).toBe('number');
  });

  it('should return valid values', () => {
    reservedWords.null = 'null-value';
    reservedWords.quotesForValues = '"';

    const parser: iParser = new NumberParser(reservedWords, 2);

    expect(parser.parse('1')).toEqual('1.00');
    expect(parser.parse(2.42)).toEqual('2.42');
    expect(parser.parse('1234')).toEqual('1234.00');

    expect(parser.parse(null)).toEqual('null-value');
    expect(parser.parse(undefined)).toEqual('null-value');
  });

  it('should return error if informed object as param.', () => {
    const parser: iParser = new NumberParser(reservedWords);
    expect(() => {
      parser.parse(new Date());
    }).toThrow(Error);
  });

  it('should return error if informed boolean', () => {
    const parser: iParser = new NumberParser(reservedWords);

    expect(() => {
      parser.parse(false);
    }).toThrow(Error);
  });

  it('should create new type properly', () => {
    const parser: iParser = NumberParser.withPrecision(reservedWords, 'my-type', 3);
    expect(parser.type).toBe('my-type');
    expect(parser.parse(2.43225)).toBe('2.432');
  });
});
