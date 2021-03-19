import { DatabaseReservedWords } from '../database/reserved-words';
import { iParser } from '../../interfaces';
import { RawParser } from './raw.parser';

describe('RawParser tests', () => {
  const reservedWords = new DatabaseReservedWords();

  it('should have the right type', () => {
    const parser: iParser = new RawParser(reservedWords);
    expect(parser.type).toBe('raw');
  });

  it('should return valid values', () => {
    reservedWords.null = 'null-value';
    reservedWords.quotesForValues = '"';

    const parser: iParser = new RawParser(reservedWords);

    expect(parser.parse('text')).toEqual('text');
    expect(parser.parse(true)).toEqual('true');
    expect(parser.parse(false)).toEqual('false');
    expect(parser.parse(2.1)).toEqual('2.1');

    expect(parser.parse(null)).toEqual('null-value');
    expect(parser.parse(undefined)).toEqual('null-value');
  });

  it('should return error if informed object as param.', () => {
    const parser: iParser = new RawParser(reservedWords);
    expect(() => {
      parser.parse(new Date());
    }).toThrow(Error);
  });
});
